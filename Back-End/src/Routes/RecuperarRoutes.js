import express from 'express';
import { solicitarRecuperacion, verificarCodigoRecuperacion, cambiarContrasena } from '../Controllers/RecuperarController.js';
import { verificarRecuperacion } from '../Middlewares/verificarRecuperacion.js';

const router = express.Router();

router.post('/recuperar', solicitarRecuperacion);
router.post('/verificar-codigo', verificarCodigoRecuperacion);
router.post('/cambiar-contrasena', /*verificarRecuperacion ,*/ cambiarContrasena);

export default router;
