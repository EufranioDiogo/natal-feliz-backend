import { Router } from "express";

const friendHiddenRouter = Router()

friendHiddenRouter.get('/hidden', () => { })
friendHiddenRouter.get('/hidden/desires', () => { })

export { friendHiddenRouter }
