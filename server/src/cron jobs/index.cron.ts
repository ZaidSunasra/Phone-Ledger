import expireSubscriptionCron from "./subscription.cron.js"
import deleteVerificationRequestCron from "./verification.cron.js"

const registerCrons = () => {
  ;(expireSubscriptionCron(), deleteVerificationRequestCron())
}

export default registerCrons
