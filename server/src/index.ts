import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import { FE_URL, PORT } from './utils/constants.js'
import mainRouter from './route.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import registerCrons from './cron jobs/index.cron.js'

const app = express()

registerCrons()

app.use(
  cors({
    origin: FE_URL,
    credentials: true,
  }),
)

app.use(express.json())
app.use(cookieparser())
app.use('/api/v1', mainRouter)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})
