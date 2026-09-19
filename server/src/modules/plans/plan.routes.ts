import { Router } from "express"
import { getAllPlansController } from "./plan.controller.js"

const planRouter = Router()

planRouter.get("/", getAllPlansController)

export default planRouter
