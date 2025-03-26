import express from 'express';
import { registroEgresado, registroEmpresa } from '../Controllers/RegistroController.js';

const router = express.Router();

router.post('/registro/egresado', registroEgresado);
router.post('/registro/empresa', registroEmpresa);

export default router;