import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';

const Notificacion = sequelize.define('Notificacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  mensaje: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'notificacion',
  timestamps: false,
});

export default Notificacion;