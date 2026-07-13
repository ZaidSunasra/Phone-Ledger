import { Queue } from "bullmq";
import redis from "../configs/redis.js";

const emailQueue = new Queue("email-queue", {
    connection: redis
})

export default emailQueue;