const express = require('express');
const cors = require('cors')
const helmet = require('helmet');
const xss = require('xss-clean');

const { dbLoader } = require('./db');
const config = require('../config');
const v1Routes = require('../api');
const Logger = require("./logger");
const errorHandler = require("./error");

/**
 * * initialize all the components required to run the app
 * @param {* } app the ExpressApp object  
 */
const appLoader = async (app) => {
    
    await dbLoader();
    
    // Load all the necessary middlewares for processing and parsing requests successfully
    app.use(express.json({limit: '5MB', type: 'application/json'}));

    // set security HTTP headers
    app.use(helmet());

    // sanitize request data
    app.use(xss());

    app.use(express.urlencoded({extended: false}));

    // enable CORS
    app.use(cors({
        origin: '*',
        allowedHeaders: ['Origin', 'Content-Length', 'Content-Type', 'Accept', 'X-Requested-With'],
        credentials: true,
        methods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
        maxAge: 12 * 3600,
    }));

    // Load API routes
    app.use(config.api.prefix + "/v1", v1Routes());

    //handle all errrors
    errorHandler(app);
}

module.exports = { appLoader }