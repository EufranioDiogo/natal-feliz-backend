import { loginUserController, isAuthenticatedUserController, logoutUserController } from '../../controllers/auth/authController';
import { Router } from "express";

const authRouter = Router()

authRouter.get('/', isAuthenticatedUserController)
authRouter.post('/login', loginUserController)
authRouter.post('/logout', logoutUserController)

export { authRouter }
