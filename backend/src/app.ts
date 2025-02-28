import express, {NextFunction} from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import config from './config/config';
import db from './database/db';

import FileRoutes from './routes/FileRoutes';
import FolderRoutes from "./routes/FolderRoutes";
import UserRoutes from "./routes/UserRoutes";
import UploadChunkRoutes from "./routes/UploadChunkRoute"
import SearchRoutes from "./routes/SearchRoute"
import {CloudStorageFactory} from './factories/CloudStorageFactory';
import {CloudProviderType} from './model/enum/CloudProvider';
import {CloudStorageStrategy} from './service/cloudStorage/CloudStorageStrategy';
import {CloudStorageService} from './service/cloudStorage/CloudStorageService';
import ResponseHandler from "./utils/ResponseHandler";

dotenv.config()

if (!process.env.PORT) {
    console.error('Error to get ports');
    process.exit(1);
}

const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const cloudProviderType = CloudProviderType[config.cloudStorageProvider as keyof typeof CloudProviderType] || CloudProviderType.AWS;
const cloudStorageStrategy: CloudStorageStrategy = CloudStorageFactory.createStorage(cloudProviderType);
const storageService = new CloudStorageService(cloudStorageStrategy);

app.use('/api', FileRoutes, FolderRoutes, UserRoutes, UploadChunkRoutes, SearchRoutes);

// Centralized error-handling middleware
app.use((err: Error, req, res, next: NextFunction) => {
    let statusCode: number;
    let message = err.message || 'Something went wrong';

    switch (err.message) {
        case 'A token is required for authentication':
            statusCode = 403;
            break;
        case 'Invalid Token':
            statusCode = 401;
            break;
        case 'Validation failed':
            statusCode = 400;
            break;
        case 'Folder not found':
            statusCode = 404;
            break;
        case 'Unauthorized':
            statusCode = 403;
            message = 'You are not authorized to perform this action';
            break;
        case 'Internal Server Error':
            statusCode = 500;
            break;
        default:
            statusCode = 500;
    }

    ResponseHandler.error(res, message, statusCode, err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Don’t exit—let Express handle it if possible
});

const PORT: number = config.port as number;
db.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})