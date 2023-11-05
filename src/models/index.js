'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const Logger = require('../loaders/logger');
const config = require("../config");
const dbConfig = config.dbConfig;
const pool = dbConfig.pool;
const db = {};

let sequelize;

sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {...pool},
  logging: (...msg) => {
    Logger.debug(msg[0]);
  }
});

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
