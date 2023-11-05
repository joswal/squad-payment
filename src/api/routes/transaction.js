//node module imports
const { celebrate, Joi } = require('celebrate');
const express = require('express');
const route = express.Router();

//internal imports
const Logger = require('../../loaders/logger');
const transactionController = require("../controllers/transactionController");


module.exports = function (app) {
    app.use('/transaction', route);

    route.post(
        '/card',
        celebrate({
            body: Joi.object({
                value: Joi.number().min(1).required(),
                description: Joi.string().min(3).max(50).required(),
                cardNumber: Joi.string().min(12).max(16).required(),
                cardHolderName: Joi.string().min(3).max(50).required(),
                cardExpiry: Joi.string().min(5).max(5).required(),
                cvv: Joi.string().min(3).max(3).required(),
                currency: Joi.string().min(3).max(3).required(),
            }),
        }),
        transactionController.processCardTransaction
    );

    route.post(
        '/login',
        celebrate({
            body: Joi.object({
                value: Joi.number().min(1).required(),
                description: Joi.string().min(3).max(50).required(),
                accountNumber: Joi.string().min(12).max(16).required(),
                accountName: Joi.string().min(3).max(50).required(),
                bankCode: Joi.string().min(5).max(5).required(),
                currency: Joi.string().min(3).max(3).required(),
            }),
        }),
        async (req, res, next) => {
            Logger.debug('Calling Sign-In endpoint with body: %o', req.body);
            try {
                const { email, password } = req.body;
                // const { user, token } = await AuthService.SignIn(email, password);
                return res.json({ statusCode: 200, message: "authentication successfull", data: {} }).status(200);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.post(
        '/forgot-password',
        celebrate({
            params: Joi.object({
                email: Joi.string().required()
            }),
        }),
        async (req, res, next) => {
            Logger.debug('Requested to reset password: %o', req.body.email);
            try {
                let result = await AuthService.requestPasswordReset(req.body.email)
                return result;
            } catch (e) {
                logger.error('🔥 error %o', e);
                return next(e);
            }
        }
    );

    route.post(
        '/reset-password',
        celebrate({
            body: Joi.object({
                token: Joi.string().required(),
                newPassword: Joi.string().min(5).max(255).required(),
            }),
        }),
        async (req, res, next) => {
            let { token, newPassword } = req.body;
            Logger.debug('Requested to reset password: %o', req.body.email);
            try {
                let result = await AuthService.changeUserPassword(token, newPassword)
                return result;
            } catch (e) {
                logger.error('🔥 error %o', e);
                return next(e);
            }
        }
    );
}


