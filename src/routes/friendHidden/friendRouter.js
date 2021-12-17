const { Router } = require("express");
const { friendHiddenRouter } = require("./hidden/friendHiddenRouter");

const friendRouter = Router()

friendRouter.use('/hidden', friendHiddenRouter)

module.exports = { friendRouter }

