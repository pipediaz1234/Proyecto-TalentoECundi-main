// Models/RespuestaEgresadoModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';
import TestEgresado from './TestEgresadoModel.js';
import Pregunta from './PreguntaModel.js';
import Opcion from './OpcionModel.js';

const RespuestaEgresado = sequelize.define('RespuestaEgresado', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_test_egresado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TestEgresado,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  id_pregunta: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Pregunta,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  id_opcion_respuesta: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Opcion,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'RespuestaEgresado',
  timestamps: false, 
});

export default RespuestaEgresado;
