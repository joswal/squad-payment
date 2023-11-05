const { appLoader } = require("./loaders/startup");
const app = require("express")();

const startServer = async () => {
    await appLoader(app);
}

startServer();

module.exports = app;
