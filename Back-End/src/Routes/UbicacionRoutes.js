import express from 'express';
import { obtenerDepartamentos, obtenerCiudadesPorDepartamento } from '../Controllers/UbicacionController.js';

const router = express.Router();

router.get('/departamentos', obtenerDepartamentos);
router.get('/ciudades/:nombreDepartamento', obtenerCiudadesPorDepartamento);

export default router;