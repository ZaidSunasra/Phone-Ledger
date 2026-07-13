import { Redis } from "ioredis"
import { REDIS_URL } from "../utils/constants.js";

const redis =  new Redis(REDIS_URL!, {
    maxRetriesPerRequest: null
})

export default redis;

