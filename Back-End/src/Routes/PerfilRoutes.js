import express from 'express';
import { actualizarPerfilEgresado, obtenerPerfilYResultadosEgresado, obtenerPerfilEgresado } from '../Controllers/PerfilController.js';

const router = express.Router();

router.put('/perfilEgresado/:id', actualizarPerfilEgresado);
router.get('/perfilEgresado/:id', obtenerPerfilYResultadosEgresado);
router.get('/perfilEgresado/actualizar/:id', obtenerPerfilEgresado);

export default router;
