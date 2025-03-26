import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';

const Habilidad = sequelize.define('Habilidad', {
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    tableName: 'Habilidad',
    timestamps: false,
});

export default Habilidad;