import express from 'express'
import authRouter from './modules/auth/auth.routes.js'
import shopRouter from './modules/shops/shop.routes.js'
import paymentRouter from './modules/payment/payment.routes.js'
import planRouter from './modules/plans/plan.routes.js'

const mainRouter = express.Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/shop', shopRouter)
mainRouter.use('/payment', paymentRouter)
mainRouter.use('/plan', planRouter)

export default mainRouter
