import express from 'express';
import { obtenerTitulos } from '../Controllers/TituloController.js';

const router = express.Router();

router.get('/titulos', obtenerTitulos);

export default router;