import emailQueue from "../queues/email.queue.js";

const sendOtpEmail = async (email: string, otp: string) => {
    await emailQueue.add(
        "send-otp",{
            email,
            otp
        },{
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

export default sendOtpEmail;