import emailQueue from "../queues/email.queue.js";

export type EmailJobType = "verification-email" | "forgot-password-email";

interface SendEmailOptions {
    type: EmailJobType
    email: string,
    otp: string,
}

const sendEmail = async ({ type, email, otp }: SendEmailOptions) => {
    await emailQueue.add(
        type,
        {
            email,
            otp,
        }, {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 3000
        },
        removeOnComplete: 100,
        removeOnFail: 100
    }
    );
}

export default sendEmail;