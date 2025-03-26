import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';
import Pregunta from './PreguntaModel.js';

const Opcion = sequelize.define('Opcion', {
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  respuesta: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
    tableName: 'Opcion',
    timestamps: false,
});

Opcion.belongsTo(Pregunta, { foreignKey: 'pregunta_id' });

export default Opcion;