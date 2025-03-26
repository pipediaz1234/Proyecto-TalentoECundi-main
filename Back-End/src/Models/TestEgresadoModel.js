
import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';
import Egresado from './EgresadoModel.js';
import Test from './TestModel.js';

const TestEgresado = sequelize.define('TestEgresado', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  egresado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Egresado,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  test_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Test,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  TotalCorrectas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precision_test: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  puntaje: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  estado: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'TestEgresado',
  timestamps: false, 
});

export default TestEgresado;
