//node module imports
const { celebrate, Joi } = require('celebrate');
const express = require('express');

//internal imports
const Logger = require('../../loaders/logger');

const route = express.Router();

module.exports = function (app) {
    app.use('/user', route);

    route.get('/me', (req, res) => {
        return res.json({
            statusCode: 200, 
            message: "user details gotten successfully", 
            data: {"name": "sample user"} 
        }).status(200);
    });

}


