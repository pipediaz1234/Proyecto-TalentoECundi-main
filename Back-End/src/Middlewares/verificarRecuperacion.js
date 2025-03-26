import jwt from 'jsonwebtoken';

export const verificarRecuperacion = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No esta autorizado' });
    }

    try {
        const decoded = jwt.verify(token, 'reestablecer-contrasena');
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
        
    }
};