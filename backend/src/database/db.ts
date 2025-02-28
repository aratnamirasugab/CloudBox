import {Sequelize} from 'sequelize';
import {initializeFileTable} from './model/File';
import {initializeFolderTable} from './model/Folder';
import {initializeUserTable} from './model/User';
import {initializeUploadChunkTable} from './model/UploadChunk';
import {initializeUploadSessionTable} from './model/UploadSession';

import * as dotenv from 'dotenv';
import config from "../config/config";

dotenv.config();

const db = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
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