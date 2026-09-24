import { Router } from "express"
import {
  addDeviceController,
  deleteDeviceController,
  getDeviceByIdController,
  getDevicesController,
  getInventorySummaryController,
} from "./inventory.controller.js"
import authenticate from "../../middlewares/auth.middleware.js"
import checkSubscription from "../../middlewares/subscription.middleware.js"
import checkMemberShip from "../../middlewares/memebership.middleware.js"

const inventoryRouter = Router()

inventoryRouter.post(
  "/",
  authenticate,
  checkSubscription,
  checkMemberShip,
  addDeviceController
)
inventoryRouter.get("/", authenticate, checkMemberShip, getDevicesController)
inventoryRouter.get(
  "/device/:deviceId",
  authenticate,
  checkMemberShip,
  getDeviceByIdController
)
inventoryRouter.get(
  "/summary",
  authenticate,
  checkMemberShip,
  getInventorySummaryController
)
inventoryRouter.delete(
  "/device/:deviceId",
  authenticate,
  checkSubscription,
  checkMemberShip,
  deleteDeviceController
)
inventoryRouter.get("/brands", authenticate)

export default inventoryRouter
