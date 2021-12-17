import { isOwnerOfData } from '../../middleware/auth/userAuthMiddleware';
import { createUserController, getUserData, updateUserData } from '../../controllers/user/userController';
import { Router } from "express";

const userRouter = Router()

userRouter.get('/', isOwnerOfData, getUserData)
userRouter.post('/', createUserController)
userRouter.put('/', isOwnerOfData, updateUserData)

export { userRouter }
