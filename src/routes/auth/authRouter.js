const { loginUserController, isAuthenticatedUserController, logoutUserController } = require('../../controllers/auth/authController');
const { Router } = require("express");

const authRouter = Router()

authRouter.get('/', isAuthenticatedUserController)
authRouter.post('/login', loginUserController)
authRouter.post('/logout', logoutUserController)

module.exports = { authRouter }
