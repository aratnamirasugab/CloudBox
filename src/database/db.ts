import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

import { initializeFileTable } from './model/File';
import { initializeFolderTable } from './model/Folder';
import { initializeUserTable } from './model/User';
import { initializeUploadChunkTable } from './model/UploadChunk';
import { initializeUploadSessionTable } from './model/UploadSession';
import {logger} from "sequelize/types/utils/logger";

dotenv.config();

const dbName = process.env.DB_NAME || 'mantaradrivedb';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'dev_password';
const dbHost = process.env.DB_HOST || 'localhost';

const db = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
        host: dbHost,
        dialect: 'postgres',
        logging: false
    },
);

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

initializeFileTable(db);
initializeUploadChunkTable(db);
initializeUserTable(db);
initializeUploadSessionTable(db);
initializeFolderTable(db);

export default db;