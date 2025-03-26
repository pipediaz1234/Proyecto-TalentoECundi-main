import express from 'express';
import { inscribirOferta, verInscripcionesEgresado, eliminarInscripcion } from '../Controllers/InscripcionController.js';

const router = express.Router();

router.post('/inscribir', inscribirOferta);
router.get('/verInscripciones/:id_egresado', verInscripcionesEgresado);
router.delete('/eliminarInscripcion/:id_egresado/:id_inscripcion', eliminarInscripcion);

export default router;