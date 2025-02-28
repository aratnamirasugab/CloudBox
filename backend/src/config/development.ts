export default {
    port: 3000,
    cloudStorageProvider: 'AWS',
    database: {
        "user": "postgres",
        "host": "db",
        "name": "mantaradrivedb",
        "password": "dev_password",
        "port": 5432
    },
    jwtSecret: "secret",
};