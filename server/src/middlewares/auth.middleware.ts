import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ErrorResponse } from 'zs-phone-common'
import { AppError } from '../utils/appError.js'
import { prisma } from '../configs/prisma.js'

const authenticate = async (
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
): Promise<any> => {
  try {
    const token = req.cookies?.Token
    if (!token) {
      throw new AppError('Unauthorized: No token provided', 401)
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string
    }
    if (!decoded.id) {
      throw new AppError('Unauthorized: Invalid token', 401)
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        trialStartedAt: true,
      },
    })
    if (!user) {
      throw new AppError('User not found', 401)
    }
    res.locals.author = {
      id: user.id,
      email: user.email,
      name: user.name,
      hasUsedTrial: user.trialStartedAt !== null,
    }
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Token expired', 401)
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Invalid token', 401)
    }
    next(error)
  }
}

export default authenticate
