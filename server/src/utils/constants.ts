import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;

export const FE_URL = process.env.FE_URL;

export const REDIS_URL = process.env.REDIS_URL

export const EMAIL_PASSWORD = process.env.EMAIL_PASS;

export const EMAIL = process.env.EMAIL_USER;

export const JWT_SECRET = process.env.JWT_SECRET;