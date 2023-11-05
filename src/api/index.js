const transaction = require("./routes/transaction");
const user = require("./routes/user");
const Router = require('express').Router();


module.exports = function () {
    transaction(Router);
    // user(Router);

    return Router;
}
