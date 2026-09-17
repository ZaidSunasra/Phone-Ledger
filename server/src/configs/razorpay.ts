import Razorpay from 'razorpay'

const razorpayKeyId = process.env.RAZORPAY_KEY_ID
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET

if (!razorpayKeyId) {
  throw new Error('RAZORPAY_KEY_ID is not configured')
}

if (!razorpayKeySecret) {
  throw new Error('RAZORPAY_KEY_SECRET is not configured')
}

export const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
})

export { razorpayKeyId }
