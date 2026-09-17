import crypto from 'crypto'

const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET

if (!razorpayKeySecret) {
  throw new Error('RAZORPAY_KEY_SECRET is not configured')
}

export const verifyRazorpaySignature = (
  orderId: string,
  paymentId: string,
  signature: string,
): boolean => {
  const generatedSignature = crypto
    .createHmac('sha256', razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  const expected = Buffer.from(generatedSignature)
  const actual = Buffer.from(signature)

  if (expected.length !== actual.length) {
    return false
  }

  return crypto.timingSafeEqual(expected, actual)
}
