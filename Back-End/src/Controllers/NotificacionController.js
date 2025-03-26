import Notificacion from '../Models/NotificacionModel.js';

export const verNotificaciones = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        // Obtener notificaciones del usuario
        const notificaciones = await Notificacion.findAll({
            where: { id_usuario },
            order: [['fecha', 'DESC']],
        });

        res.status(200).json({ notificaciones });
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ message: 'Error al obtener las notificaciones' });
    }
};

export const actualizarEstadoNotificaciones = async (req, res) => {
    const { notificacionesIds } = req.body;
    const { id_usuario } = req.params;

    try {
        // Verificar si se han enviado IDs de notificaciones
        if (!notificacionesIds || !Array.isArray(notificacionesIds) || notificacionesIds.length === 0) {
            return res.status(400).json({ message: 'Se deben proporcionar los IDs de las notificaciones a actualizar' });
        }

        // Verificar si se ha proporcionado el id_usuario
        if (!id_usuario) {
            return res.status(400).json({ message: 'Se debe proporcionar el ID del usuario' });
        }

        // Actualizar el estado de todas las notificaciones proporcionadas que pertenezcan al usuario
        await Notificacion.update(
            { estado: 'Leída' },
            {
                where: {
                    id: notificacionesIds,
                    id_usuario: id_usuario,
                },
            }
        );

        res.status(200).json({ message: 'Estado de las notificaciones actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el estado de las notificaciones:', error);
        res.status(500).json({ message: 'Error al actualizar el estado de las notificaciones' });
    }
};

