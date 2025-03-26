import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';

const HabilidadPregunta = sequelize.define('HabilidadPregunta', {
  habilidad_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Habilidad',
      key: 'id',
    },
  },
  pregunta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Pregunta',
      key: 'id',
    },
  },
}, {
  timestamps: false,  
  tableName: 'HabilidadPregunta',
});

export default HabilidadPregunta;
