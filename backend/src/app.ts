import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

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

dotenv.config()

if (!process.env.PORT) {
    console.error('Error to get ports');
    process.exit(1);
}

const PORT = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// TODO : introduce proper way to fetch and assign the cloud provider type.
// setting up cloud storage.
const cloudStorageStrategy: CloudStorageStrategy = CloudStorageFactory.createStorage(CloudProviderType.AWS);
const storageService = new CloudStorageService(cloudStorageStrategy);

app.use('/api', FileRoutes, FolderRoutes, UserRoutes, UploadChunkRoutes, SearchRoutes);

db.sync({force: true}).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})