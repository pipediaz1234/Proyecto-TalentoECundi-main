import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDatabase } from './src/Config/connection.js';

// Importar las relaciones entre modelos
import './src/Config/relationships.js';

// Importe de Middlewares
import { verifyToken } from './src/Middlewares/verificarToken.js';

//Importe de rutas
import registroRoutes from './src/Routes/RegistroRoutes.js';
import loginRoutes from './src/Routes/LoginRoutes.js';
import RecuperarRoutes from './src/Routes/RecuperarRoutes.js';
import TestRoutes from './src/Routes/TestRoutes.js';
import PerfilRoutes from './src/Routes/PerfilRoutes.js';
import TituloRoutes from './src/Routes/TitulosRoutes.js';
import UbicacionRoutes from './src/Routes/UbicacionRoutes.js';
import OfertaRoutes from './src/Routes/OfertaRoutes.js';
import InscripcionRoutes from './src/Routes/InscripcionRoutes.js';
import NotificacionRoutes from './src/Routes/NotificacionRoutes.js';

const app = express();

//Conexión a la base de datos
connectDatabase();

// Middlewares de configuración
app.use(cors());
app.use(bodyParser.json({ type: 'application/json', limit: '10mb' }));//recibe un cuerpo y un objeto json
app.use(bodyParser.urlencoded({ extended: false })); //recibe url codificada

// Rutas
const apiRouter = express.Router();

apiRouter.use(registroRoutes);
apiRouter.use(loginRoutes);
apiRouter.use(RecuperarRoutes);
apiRouter.use(/* verifyToken, */ TestRoutes);
apiRouter.use(/* verifyToken, */ PerfilRoutes);
apiRouter.use(TituloRoutes);
apiRouter.use(UbicacionRoutes);
apiRouter.use(/* verifyToken, */ OfertaRoutes);
apiRouter.use(/* verifyToken, */ InscripcionRoutes);
apiRouter.use(/* verifyToken, */ NotificacionRoutes);

app.use('/api/v1', apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});