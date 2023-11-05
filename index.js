const app = require('./src/app');
const config = require("./src/config");
const Logger = require("./src/loaders/logger");

const server = app.listen(config.port, () => {
    Logger.info(`
            ################################################
            🛡️  Server listening on port: ${config.port} 🛡️
            ################################################
        `);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            Logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    Logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    Logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
