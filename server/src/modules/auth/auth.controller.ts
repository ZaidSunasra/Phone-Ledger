import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import {
  forgotPasswordSchema,
  loginSchema,
  resendOtpSchema,
  resetPasswordSchema,
  signupSchema,
  verifyOtpSchema,
  ErrorResponse,
  SendOtpSuccessResponse,
  SuccessResponse,
  LoginSuccessResponse,
  Author,
} from 'zs-phone-common'
import {
  addUserService,
  deleteVerificationDetailService,
  findExistingEmailService,
  generateVerificationIdService,
  getVerificationDetailService,
  resetPasswordService,
  updateVerificationIdService,
  verifyOtpService,
} from './auth.service.js'
import { generateOtp } from '../../utils/generateOtp.js'
import { compareHash, hashValue } from '../../utils/bcrypt.js'
import sendEmail from '../../services/email.services.js'
import { JWT_SECRET } from '../../utils/constants.js'
import { AppError } from '../../utils/appError.js'
import { cookieOptions } from '../../utils/constants.js'

export const verifyEmailController = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction,
): Promise<any> => {
  const { otp } = req.body
  const verificationId = req.cookies.verificationId

  const validation = verifyOtpSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      message: 'Input validation error',
      error: validation.error.issues,
    })
  }

  try {
    const verificationData = await verifyOtpService(otp, verificationId)

    await addUserService({
      name: verificationData.name!,
      email: verificationData.email,
      password: verificationData.passwordHash!,
    })

    await deleteVerificationDetailService(verificationId)
    res.clearCookie('verificationId')

    return res.status(200).json({
      message: 'Account created successfully. Please login to your account',
    })
  } catch (error) {
    next(error)
  }
}

export const signupController = async (
  req: Request,
  res: Response<SendOtpSuccessResponse | ErrorResponse>,
  next: NextFunction,
): Promise<any> => {
  const { name, email, password } = req.body
  const validation = signupSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      message: 'Input validation error',
      error: validation.error.issues,
    })
  }

  try {
    const existingUser = await findExistingEmailService(email)

    if (existingUser) {
      throw new AppError(
        'An account with this email address already exists. Please sign in or use a different email address.',
        409,
      )
    }

    const otp = generateOtp()

    const hashedOtp = await hashValue(otp, 10)
    const hashedPassword = await hashValue(password)

    const verificationId = await generateVerificationIdService(
      name,
      email,
      hashedPassword,
      hashedOtp,
    )

    sendEmail({ type: 'verification-email', email, otp })

    res.cookie('verificationId', verificationId.id, cookieOptions(10 * 60 * 1000))

    return res.status(200).json({
      message: 'Verification code has been sent to your email address.',
      resendAvailableAt: verificationId.resendAvailableAt,
    })
  } catch (error) {
    next(error)
  }
}

export const loginController = async (
  req: Request,
  res: Response<LoginSuccessResponse | ErrorResponse>,
  next: NextFunction,
): Promise<any> => {
  const { email, password } = req.body

  const validation = loginSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      message: 'Input validation error',
      error: validation.error.issues,
    })
  }

  try {
    const user = await findExistingEmailService(email)

    if (!user) {
      throw new AppError(
        'No account was found with this email address. Please check the email or create a new account.',
        404,
      )
    }

    const checkPassword = await compareHash(password, user.password)

    if (!checkPassword) {
      throw new AppError('Incorrect password. Please try again.', 401)
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET as string,
      {
        expiresIn: '1d',
      },
    )

    res.cookie('Token', token, cookieOptions(24 * 60 * 60 * 1000))

    return res.status(200).json({
      message: 'Login successful',
      userData: {
        name: user.name,
        email: user.email,
        id: user.id,
        currentPlan: user.subscription[0]?.plan?.code ?? 'NO PLAN',
      },
    })
  } catch (error) {
    next(error)
  }
}

export const forgotPasswordController = async (
  req: Request,
  res: Response<SendOtpSuccessResponse | ErrorResponse>,
  next: NextFunction,
): Promise<any> => {
  const { email } = req.body

  const validation = forgotPasswordSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      message: 'Input validation error',
      error: validation.error.issues,
    })
  }

  try {
    const user = await findExistingEmailService(email)

    if (!user) {
      throw new AppError(
        'No account was found with this email address. Please check the email or create a new account.',
        404,
      )
    }

    const otp = generateOtp()

    const hashedOtp = await hashValue(otp, 10)

    const verificationId = await generateVerificationIdService(null, email, null, hashedOtp)

    sendEmail({ type: 'forgot-password-email', email, otp })

    res.cookie('verificationId', verificationId.id, cookieOptions(10 * 60 * 1000))

    return res.status(200).json({
      message: 'Verification code has been sent to your email address.',
      resendAvailableAt: verificationId.resendAvailableAt,
    })
  } catch (error) {
    next(error)
  }
}

export const verifyResetOtpController = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction,
): Promise<any> => {
  const { otp } = req.body
  const verificationId = req.cookies.verificationId

  const validation = verifyOtpSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      message: 'Input validation error',
      error: validation.error.issues,
    })
  }

  try {
    await verifyOtpService(otp, verificationId)

    return res.status(200).json({
      message: 'OTP verified successfully. Please set a new password.',
    })
  } catch (error) {
    next(error)
  }
}

export const resetPasswordController = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction,
): Promise<any> => {
  const verificationId = req.cookies.verificationId

  const validation = resetPasswordSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      message: 'Input validation error',
      error: validation.error.issues,
    })
  }
  const { password } = validation.data

  try {
    const hashedPassword = await hashValue(password)
    await resetPasswordService(hashedPassword, verificationId)

    await deleteVerificationDetailService(verificationId)
    res.clearCookie('verificationId')

    return res.status(200).json({
      message: 'Your password has been changed successfully. Please log in with your new password.',
    })
  } catch (error) {
    next(error)
  }
}

export const resendOtpController = async (
  req: Request,
  res: Response<SendOtpSuccessResponse | ErrorResponse>,
  next: NextFunction,
): Promise<any> => {
  const verificationId = req.cookies.verificationId
  const { type } = req.body

  const validation = resendOtpSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      message: 'Input validation error',
      error: validation.error.issues,
    })
  }

  try {
    const otp = generateOtp()
    const hashedOtp = await hashValue(otp, 10)

    const verificationData = await getVerificationDetailService(verificationId)

    if (new Date() < verificationData?.resendAvailableAt!) {
      throw new AppError('Please wait a minute before requesting a new verification code.', 500)
    }

    const verfication = await updateVerificationIdService(verificationId, hashedOtp)

    sendEmail({ type: type, email: verificationData?.email!, otp })

    return res.status(200).json({
      message: 'Verification code has been re-sent to your email address.',
      resendAvailableAt: verfication?.resendAvailableAt,
    })
  } catch (error) {
    next(error)
  }
}

export const getMeController = async (
  _req: Request,
  res: Response<LoginSuccessResponse | ErrorResponse>,
  next: NextFunction,
): Promise<any> => {
  const author: Author = res.locals.author
  try {
    const user = await findExistingEmailService(author.email)
    if (!user) {
      throw new AppError('', 401)
    }
    return res.status(200).json({
      message: 'Details fetched successfully',
      userData: {
        name: user?.name,
        email: user?.email,
        id: user.id,
        currentPlan: user.subscription[0]?.plan?.code ?? 'NO PLAN',
      },
    })
  } catch (error) {
    next(error)
  }
}

export const logoutController = async (
  _req: Request,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction,
): Promise<any> => {
  try {
    res.clearCookie('Token')
    return res.status(200).send({
      message: 'Logout successful',
    })
  } catch (error) {
    next(error)
  }
}
