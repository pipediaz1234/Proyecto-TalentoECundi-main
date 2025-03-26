import express from 'express';
import { 
    crearOferta, 
    editarOferta, 
    eliminarOferta, 
    verPublicacionesPorEmpresa, 
    cerrarOferta,
    verPublicacionesGenerales,
    filtrarOfertas,
    verEgresadosPostulados,
    rechazarPostulacion,
    pasarSegundaFase
} from '../Controllers/OfertaController.js';

const router = express.Router();

router.post('/crearOferta', crearOferta);
router.put('/editarOferta/:id_empresa/:id', editarOferta);
router.delete('/eliminarOferta/:id_empresa/:id', eliminarOferta);
router.get('/verPublicaciones/:id_empresa', verPublicacionesPorEmpresa);
router.patch('/cerrarOferta/:id_empresa/:id_oferta', cerrarOferta);
router.get('/verPublicacionesGenerales', verPublicacionesGenerales);
router.get('/filtrarOfertas', filtrarOfertas);
router.get('/empresa/:id_empresa/oferta/:id_oferta/egresadosPostulados', verEgresadosPostulados);
router.patch('/inscripcion/:id_inscripcion/rechazar', rechazarPostulacion);
router.patch('/inscripcion/:id_inscripcion/segundaFase', pasarSegundaFase);

export default router;