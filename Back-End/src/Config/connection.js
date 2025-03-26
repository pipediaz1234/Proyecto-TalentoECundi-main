import { Sequelize } from 'sequelize';
import settings from './config.json' assert { type: 'json' }; 

const sequelize = new Sequelize(
  settings.database,  
  settings.user,       
  settings.password, 
  {
    host: settings.host,
    port: settings.port,
    dialect: 'mysql',  
    logging: false     
  }
);

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada con Sequelize.');
  } catch (error) {
    console.error('Error al conectar la base de datos:', error);
  }
}

export default sequelize;

