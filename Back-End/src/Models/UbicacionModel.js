import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';

const Ubicacion = sequelize.define('Ubicacion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ciudad: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    departamento: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'ubicacion',
    timestamps: false
});

export default Ubicacion;
