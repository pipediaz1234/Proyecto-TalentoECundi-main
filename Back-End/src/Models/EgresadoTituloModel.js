import { DataTypes } from 'sequelize';
import sequelize from '../Config/connection.js';

const EgresadoTitulo = sequelize.define('Egresado_Titulo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_egresado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Egresado',
            key: 'id',
        },
    },
    id_titulo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Titulo',
            key: 'id',
        },
    },
    estado: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'Egresado_Titulo',
    timestamps: false,
});

export default EgresadoTitulo;
