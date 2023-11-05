
const db = require('../models');
const Logger = require("./logger");

//Sync Database
const dbLoader = async () => {
  db.sequelize.sync({ force: false }).then(function () {
    Logger.info('Nice! Database looks fine');
  }).catch(function (err) {
    Logger.error(err, "Something went wrong with the Database Update!")
  });
}


module.exports = { dbLoader }