import fs from 'fs';
import config from './config';

const envContent = `
    PORT=${config.port}
    CLOUD_STORAGE_PROVIDER=${config.cloudStorageProvider}
    DB_USER=${config.database.user}
    DB_HOST=${config.database.host}
    DB_NAME=${config.database.name}
    DB_PASSWORD=${config.database.password}
    DB_PORT=${config.database.port}
    NODE_ENV=${process.env.NODE_ENV || 'development'}
    JWT_SECRET=${config.jwtSecret}
`;

fs.writeFileSync('.env', envContent.trim());
console.log('.env file generated successfully');