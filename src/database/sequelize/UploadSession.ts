import {DataTypes} from "sequelize";
import db from '../db';

const UploadSession = db.define('UploadSession', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fileId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalChunks: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    uploadedChunks: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

db.sync().then(() => {
    console.log('UploadSession table created');
}).catch((error) => {
    console.error('Unable to create UploadSession table:', error);
});