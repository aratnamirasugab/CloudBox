"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var dotenv = __importStar(require("dotenv"));
var File_1 = require("./model/File");
var Folder_1 = require("./model/Folder");
var User_1 = require("./model/User");
var UploadChunk_1 = require("./model/UploadChunk");
var UploadSession_1 = require("./model/UploadSession");
dotenv.config();
var dbName = process.env.DB_NAME || 'mantaradrivedb';
var dbUser = process.env.DB_USER || 'postgres';
var dbPassword = process.env.DB_PASSWORD || 'dev_password';
var dbHost = process.env.DB_HOST || 'localhost';
var db = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres',
});
db.authenticate().then(function () {
    console.log('Connection has been established successfully.');
}).catch(function (error) {
    console.error('Unable to connect to the database: ', error);
});
(0, File_1.initializeFileTable)(db);
(0, UploadChunk_1.initializeUploadChunkTable)(db);
(0, User_1.initializeUserTable)(db);
(0, UploadSession_1.initializeUploadSessionTable)(db);
(0, Folder_1.initializeFolderTable)(db);
db.sync({ force: false }).then(function () {
    console.log('Database & tables created!');
}).catch(function (error) {
    console.error('Error creating database tables: ', error);
});
exports.default = db;
//# sourceMappingURL=db.js.map