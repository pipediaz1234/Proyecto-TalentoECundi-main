import express from 'express';
import { verNotificaciones, actualizarEstadoNotificaciones } from '../Controllers/NotificacionController.js';

const router = express.Router();

router.get('/notificaciones/:id_usuario', verNotificaciones);
router.put('/notificaciones/:id_usuario', actualizarEstadoNotificaciones);


export default router;
