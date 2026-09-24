import {
  addDeviceSchema,
  ErrorResponse,
  GetBrandsSuccessResponse,
  GetDeviceByIdSuccessResponse,
  GetDevicesQuery,
  GetDevicesSuccessResponse,
  GetInventorySummarySuccessResponse,
  Membership,
  SuccessResponse,
} from "@phone-ledger/shared"
import type { NextFunction, Request, Response } from "express"
import {
  addDeviceService,
  deleteDeviceService,
  getBrandsService,
  getDeviceByIdService,
  getDevicesService,
  getInventorySummaryService,
} from "./inventory.service.js"

export const addDeviceController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validation = addDeviceSchema.safeParse(req.body)
  if (!validation.success) {
    res.status(400).json({
      message: "Input validation error",
      error: validation.error.issues,
    })
    return
  }

  const { customer, device } = validation.data
  const membership: Membership = res.locals.membership

  try {
    await addDeviceService({ customer, device }, membership)

    res.status(201).json({
      message: "Device added successfully",
    })
    return
  } catch (error) {
    next(error)
  }
}

export const getDevicesController = async (
  req: Request,
  res: Response<GetDevicesSuccessResponse | ErrorResponse>,
  next: NextFunction
): Promise<void> => {
  const membership: Membership = res.locals.membership

  const query: GetDevicesQuery = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 50,
    search: typeof req.query.search === "string" ? req.query.search : undefined,
    sortBy:
      req.query.sortBy === "buyPrice" ||
      req.query.sortBy === "buyDate" ||
      req.query.sortBy === "name"
        ? req.query.sortBy
        : undefined,
    sortOrder:
      req.query.sortOrder === "asc" || req.query.sortOrder === "desc"
        ? req.query.sortOrder
        : undefined,
  }

  try {
    console.log("Devices Controller reached")
    const devices = await getDevicesService(membership, query)

    res.status(200).json({
      devices: devices.devices,
      pagination: devices.pagination,
      message: "Devices fetched successfully",
    })
    return
  } catch (error) {
    next(error)
  }
}

export const getDeviceByIdController = async (
  req: Request<{ deviceId: string }>,
  res: Response<GetDeviceByIdSuccessResponse | ErrorResponse>,
  next: NextFunction
): Promise<void> => {
  const membership: Membership = res.locals.membership
  const deviceId = req.params.deviceId

  try {
    const device = await getDeviceByIdService(deviceId, membership)

    res.status(200).json({
      device,
      message: "Device fetched successfully",
    })
    return
  } catch (error) {
    next(error)
  }
}

export const getInventorySummaryController = async (
  _req: Request,
  res: Response<GetInventorySummarySuccessResponse | ErrorResponse>,
  next: NextFunction
): Promise<void> => {
  const membership: Membership = res.locals.membership

  try {
    const summary = await getInventorySummaryService(membership)

    res.status(200).json({
      summary,
      message: "Inventory summary fetched successfully",
    })
    return
  } catch (error) {
    next(error)
  }
}

export const deleteDeviceController = async (
  req: Request<{ deviceId: string }>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
): Promise<void> => {
  const deviceId = req.params.deviceId
  const membership = res.locals.membership

  try {
    await deleteDeviceService(deviceId, membership)
    res.status(200).json({
      message: "Device deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

export const getBrandsController = async (
  _req: Request,
  res: Response<GetBrandsSuccessResponse | ErrorResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const brands = await getBrandsService()

    res.status(200).json({
      brands,
      message: "Brands fetched successfully",
    })
    return
  } catch (error) {
    next(error)
  }
}
