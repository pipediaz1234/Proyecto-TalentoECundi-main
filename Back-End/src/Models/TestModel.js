import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';
import Pregunta from './PreguntaModel.js';

const Test = sequelize.define('Test', {
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  tiempo_minutos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Test',
  timestamps: false,
});


export default Test;