"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db_1 = __importDefault(require("../db"));
var UploadSession = db_1.default.define('UploadSession', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fileId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    totalChunks: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    uploadedChunks: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
db_1.default.sync().then(function () {
    console.log('UploadSession table created');
}).catch(function (error) {
    console.error('Unable to create UploadSession table:', error);
});
//# sourceMappingURL=UploadSession.js.map