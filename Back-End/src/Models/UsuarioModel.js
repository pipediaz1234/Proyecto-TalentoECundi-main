import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, {
    tableName: 'Usuario',
    timestamps: false
});

export default Usuario;