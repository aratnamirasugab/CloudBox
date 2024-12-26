import {DataTypes} from "sequelize";
import db from '../db';

const UploadChunk = db.define('UploadChunk', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fileId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chunkIndex: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    blobLink: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isUploaded: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    checksum: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uploadedAt: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

db.sync().then(() => {
    console.log('UploadChunk table created');
}).catch((error) => {
    console.error('Unable to create UploadChunk table:', error);
});