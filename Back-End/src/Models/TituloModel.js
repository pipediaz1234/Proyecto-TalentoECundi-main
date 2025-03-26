import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';

const Titulo = sequelize.define('Titulo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    codigo: {
        type: DataTypes.STRING(450),
        allowNull: false,
    },
    categoria: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'Titulo',
    timestamps: false,
});

export default Titulo;
