import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';

const Inscripcion = sequelize.define('Inscripcion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_oferta: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_egresado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_inscripcion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'inscripcion',
  timestamps: false,
});

export default Inscripcion;
