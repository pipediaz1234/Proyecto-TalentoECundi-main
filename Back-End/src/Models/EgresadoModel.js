import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';

const Egresado = sequelize.define('Egresado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario', 
            key: 'id',
        },
    },
    codigo_estudiante: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    documento: {
        type: DataTypes.STRING(20),
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(15)
    },
    id_residencia: {
        type: DataTypes.INTEGER
    },
    genero: {
        type: DataTypes.STRING(1)
    },
    fecha_nacimiento: {
        type: DataTypes.DATE
    },
    ano_graduacion: {
        type: DataTypes.INTEGER
    },
    imagen_perfil: {
        type: DataTypes.BLOB
    },
    curriculum: {
        type: DataTypes.BLOB
    }
}, {
    tableName: 'Egresado',
    timestamps: false
});

export default Egresado;
