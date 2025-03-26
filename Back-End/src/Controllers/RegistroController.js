import bcrypt from 'bcrypt';
import Usuario from '../Models/UsuarioModel.js';
import Egresado from '../Models/EgresadoModel.js';
import Empresa from '../Models/EmpresaModel.js';

export const registroEgresado = async (req, res) => {
    const { 
        correo, 
        contrasena, 
        confirmarContrasena, 
        nombres, 
        apellidos, 
        codigo_estudiante, 
        fecha_nacimiento, 
        genero, 
        ano_graduacion 
    } = req.body;

    // Validación de confirmación de contraseña
    if (contrasena !== confirmarContrasena) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    try {
        // Verificar si el correo ya está en uso
        const usuarioExistente = await Usuario.findOne({ where: { correo } });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear registro en la tabla Usuario
        const nuevoUsuario = await Usuario.create({
            correo,
            contrasena: hashedPassword,
            id_rol: 1
        });

        // Crear registro en la tabla Egresado, referenciando el usuario creado
        const nuevoEgresado = await Egresado.create({
            id_usuario: nuevoUsuario.id,
            nombres,
            apellidos,
            codigo_estudiante,
            fecha_nacimiento,
            genero,
            ano_graduacion
        });

        // Respuesta de petición exitoso
        res.status(201).json({
            message: 'Registro exitoso',
            usuario: nuevoUsuario,
            egresado: nuevoEgresado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const registroEmpresa = async (req, res) => {
    const {
        correo,
        contrasena,
        confirmarContrasena,
        nit,
        nombre
    } = req.body;

    // Validación de confirmación de contraseña
    if (contrasena !== confirmarContrasena) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    try {
        // Verificar si el correo ya está en uso
        const usuarioExistente = await Usuario.findOne({ where: { correo } });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear registro en la tabla Usuario
        const nuevoUsuario = await Usuario.create({
            correo,
            contrasena: hashedPassword,
            id_rol: 2 
        });

        // Crear registro en la tabla Empresa, referenciando el usuario creado
        const nuevaEmpresa = await Empresa.create({
            id_usuario: nuevoUsuario.id,
            nit,
            nombre
        });

        // Respuesta de petición exitosa
        res.status(201).json({
            message: 'Registro de empresa exitoso',
            usuario: nuevoUsuario,
            empresa: nuevaEmpresa
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};