import dotenv from 'dotenv';
dotenv.config();

class Config {
    public port: number;
    public cloudStorageProvider: string;
    public database: Database;

    constructor() {
        const env = process.env.NODE_ENV || 'development';
        const config = require(`./${env}`).default;
        
        this.port = config.port;
        this.cloudStorageProvider = config.cloudStorageProvider;
        this.database = config.database;
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