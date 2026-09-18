import cron from 'node-cron'
import { prisma } from '../configs/prisma.js'

const expireSubscriptionCron = () => {
  cron.schedule('0 * * * *', async () => {
    await prisma.subscription.updateMany({
      where: {
        status: 'ACTIVE',
        endsAt: {
          lt: new Date(),
        },
      },
      data: {
        status: 'EXPIRED',
      },
    })
  })
}

export default expireSubscriptionCron
