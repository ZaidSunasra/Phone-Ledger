import { Router } from "express"
import checkMemberShip from "../../middlewares/memebership.middleware.js"
import authenticate from "../../middlewares/auth.middleware.js"
import { getCustomerDetailsController } from "./customer.controller.js"

const customerRouter = Router()

customerRouter.get(
  "/:details",
  authenticate,
  checkMemberShip,
  getCustomerDetailsController
)

export default customerRouter
