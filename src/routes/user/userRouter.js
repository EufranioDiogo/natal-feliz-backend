const { isOwnerOfData } = require('../../middleware/auth/userAuthMiddleware');
const { createUserController, getUserData, updateUserData } = require('../../controllers/user/userController');
const { Router } = require("express");

const userRouter = Router()

userRouter.get('/', isOwnerOfData, getUserData)
userRouter.post('/', createUserController)
userRouter.put('/', isOwnerOfData, updateUserData)

module.exports = { userRouter }

