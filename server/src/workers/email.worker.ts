import { Worker } from "bullmq";
import transporter from "../configs/mailer.js";
import redis from "../configs/redis.js";
import { EMAIL } from "../utils/constants.js";

new Worker("email-queue", async (job) => {
    const { email, otp } = job.data;
    const info = await transporter.sendMail({
        from: EMAIL,
        to: email,
        subject: "OTP VERIFICATION",
        text: `Your otp is ${otp}. OTP will expired in 10minutes`
    })
    return info.messageId;
}, { connection: redis })