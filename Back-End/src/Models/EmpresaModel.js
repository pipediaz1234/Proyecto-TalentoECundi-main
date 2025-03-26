import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';

const Empresa = sequelize.define('Empresa', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario', 
            key: 'id',
        },
    },
    nit: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    correo_contacto: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    pagina_web: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    logo: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    banner: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    id_ubicacion_empresa: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Ubicacion', 
            key: 'id',
        },
    },
}, {
    tableName: 'Empresa',
    timestamps: false,
});

export default Empresa;
