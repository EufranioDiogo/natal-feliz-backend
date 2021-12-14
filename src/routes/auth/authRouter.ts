import { Router } from "express";

const authRouter = Router()

authRouter.get('/', () => { })
authRouter.post('/login', () => { })
authRouter.post('/logout', () => { })

export { authRouter }
