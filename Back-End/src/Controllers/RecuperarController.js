import Usuario from '../Models/UsuarioModel.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secretKey = 'reestablecer-contrasena'; 


export const solicitarRecuperacion = async (req, res) => {
    const { correo } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(404).json({ message: 'El correo no está registrado' });
        }

        // Generar un código de 6 dígitos aleatorio
        const codigoRecuperacion = Math.floor(100000 + Math.random() * 900000).toString();

        // Generar el token con el código de recuperación y un tiempo de expiración de 15 minutos
        const token = jwt.sign(
            { id_usuario: usuario.id, correo: usuario.correo, codigoRecuperacion },
            secretKey,
            { expiresIn: '60m' }
        );

        // Enviar el código por correo
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'yimmernicolas@gmail.com',
                pass: 'ovjf hogc xtjr dahi'
            }
        });

        const mailOptions = {
            from: 'yimmernicolas@gmail.com',
            to: correo,
            subject: 'Código de recuperación de contraseña',
            text: `Tu código de recuperación es: ${codigoRecuperacion}. Este código expira en 15 minutos.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Código de recuperación enviado al correo', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const verificarCodigoRecuperacion = async (req, res) => {
    const { token, codigoIngresado } = req.body;

    try {
        // Verificar y decodificar el token
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Código incorrecto o expirado' });
            }

            // Comparar el código ingresado con el que está en el token
            if (codigoIngresado !== decoded.codigoRecuperacion) {
                return res.status(400).json({ message: 'Código de recuperación incorrecto' });
            }


            // Si el código es correcto, devolver éxito
            res.status(200).json({ message: 'Código verificado correctamente', usuarioId: decoded.id_usuario, token });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const cambiarContrasena = async (req, res) => {
    const { token, nuevaContrasena, confirmarContrasena } = req.body;

    // Verificar que las contraseñas coinciden
    if (nuevaContrasena !== confirmarContrasena) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    try {
        // Verificar y decodificar el token
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Token inválido o expirado' });
            }

            // Buscar el usuario por su ID en el token decodificado
            const usuario = await Usuario.findOne({ where: { id: decoded.id_usuario } });
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Encriptar la nueva contraseña
            const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

            // Actualizar la contraseña del usuario
            await Usuario.update(
                { contrasena: hashedPassword }, 
                { where: { id: usuario.id } }    
            );

            res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};