import { Router } from "express";
import { friendHiddenRouter } from "./hidden/friendHiddenRouter";

const friendRouter = Router()

friendRouter.use('/hidden', friendHiddenRouter)

export { friendRouter }
