import express from 'express';
import { 
    crearTestConPreguntas, 
    obtenerTestConDetalles, 
    agregarPreguntas, 
    guardarYCalcularRespuestas,
    obtenerResultadosConHabilidades
} from '../Controllers/TestController.js';

const router = express.Router();

router.post('/crear-test', crearTestConPreguntas);
router.get('/test/:id', obtenerTestConDetalles);
router.post('/test/:id/preguntas', agregarPreguntas);
router.post('/test/:test_id/respuestas', guardarYCalcularRespuestas);
router.get('/test/:id_egresado/resultados', obtenerResultadosConHabilidades);

export default router;
