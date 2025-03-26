import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';
import Test from './TestModel.js';


const Pregunta = sequelize.define('Pregunta', {
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
},{
    tableName: 'Pregunta',
    timestamps: false,
});

export default Pregunta;