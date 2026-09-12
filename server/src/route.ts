import express from 'express'
import authRouter from './modules/auth/auth.routes.js'
import shopRouter from './modules/shops/shop.routes.js'

const mainRouter = express.Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/shop', shopRouter)

export default mainRouter
