import { Worker } from "bullmq";
import transporter from "../configs/mailer.js";
import redis from "../configs/redis.js";
import { EMAIL } from "../utils/constants.js";

new Worker("email-queue",
    async (job) => {
        const { email, otp } = job.data;

        let subject = "";
        let text = "";

        switch (job.name) {
            case "verification-email":
                subject = "Email Verification";
                text = `Your verification OTP is ${otp}. It expires in 10 minutes.`;
                break;

            case "forgot-password-email":
                subject = "Password Reset OTP";
                text = `Your password reset OTP is ${otp}. It expires in 10 minutes. If you didn't request this, you can ignore this email.`;
                break;

            default:
                throw new Error(`Unknown email job: ${job.name}`);
        }

        const info = await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject: subject,
            text: text
        });

        return info.messageId;
    },
    { connection: redis }
)