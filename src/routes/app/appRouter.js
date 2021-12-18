const { getAppStatistics } = require('../../controllers/app/appController');

const appRouter = require('express').Router();


appRouter.get('/statistics', getAppStatistics)

module.exports = { appRouter }