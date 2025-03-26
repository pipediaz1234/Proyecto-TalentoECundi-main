import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';

const Oferta = sequelize.define('Oferta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  id_modalidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_ubicacion_oferta: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_cierre: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(1),
    allowNull: false,
  },
  salario: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  tipo_contrato: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  experiencia_requerida: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  hora_trabajo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  vacantes_disponibles: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  habilidades: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  idiomas: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'oferta',
  timestamps: false,
});

export default Oferta;