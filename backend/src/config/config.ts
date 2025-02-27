import dotenv from 'dotenv';
dotenv.config();

class Config {
    public port: number;
    public cloudStorageProvider: string;
    public database: Database;

    constructor() {
        const env = process.env.NODE_ENV || 'development';
        const config = require(`./${env}`).default;

        // use env vars if present, otherwise fallback to the config file.
        this.port = process.env.PORT || config.port;
        this.cloudStorageProvider = process.env.CLOUD_STORAGE_PROVIDER || config.cloudStorageProvider;
        this.database = {
            user: process.env.DB_USER || config.database.user,
            host: process.env.DB_HOST || config.database.host,
            name: process.env.DB_NAME || config.database.name,
            password: process.env.DB_PASSWORD || config.database.password,
            port: parseInt(process.env.DB_PORT || config.database.port, 10),
        };
    }
}

class Database {
    public user: string;
    public host: string;
    public name: string;
    public password: string;
    public port: number;
}

export default new Config();