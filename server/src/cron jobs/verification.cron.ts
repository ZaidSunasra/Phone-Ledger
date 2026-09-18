import cron from 'node-cron'
import { prisma } from '../configs/prisma.js'

const deleteVerificationRequestCron = () => {
  cron.schedule('0 2 * * *', async () => {
    await prisma.verificationRequest.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    })
  })
}

export default deleteVerificationRequestCron
