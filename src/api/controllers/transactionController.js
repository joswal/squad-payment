const Logger = require('../../loaders/logger');
const TransactionService = require('../../services/TransactionService');


const processCardTransaction = async (req, res, next) => {
    Logger.debug('Calling process card transaction endpoint with body: %o', req.body);
    try {
        const {result} = await TransactionService.processCardTransaction(req.body)
        return res.status(201).json({ statusCode: 201, message: "transaction successfull", data: {} });
    } catch (e) {
        Logger.error('🔥 error: %o', e);
        return next(e);
    }

}

const processAccountTransaction = async (req, res, next) => {
    Logger.debug('Calling process account transaction endpoint with body: %o', req.body);
    try {
        const {result} = await TransactionService.processAccountTransaction(req.body)
        return res.status(201).json({ statusCode: 201, message: "transaction successfull", data: {} });
    } catch (e) {
        Logger.error('🔥 error: %o', e);
        return next(e);
    }
}

const getTransactionsList = async (req, res, next) => {

}

module.exports = {
    processCardTransaction, processAccountTransaction, getTransactionsList
}