"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db_1 = __importDefault(require("../db"));
var UploadChunk = db_1.default.define('UploadChunk', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fileId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    chunkIndex: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    size: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    blobLink: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    isUploaded: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    checksum: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    uploadedAt: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
db_1.default.sync().then(function () {
    console.log('UploadChunk table created');
}).catch(function (error) {
    console.error('Unable to create UploadChunk table:', error);
});
//# sourceMappingURL=UploadChunk.js.map