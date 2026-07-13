import express from "express";
import cors from "cors"
import cookieparser from "cookie-parser"
import { FE_URL, PORT } from "./utils/constants.js";
import mainRouter from "./route.js";

const app = express();

app.use(cors({
    origin: FE_URL,
    credentials: true
}))

app.use(express.json())
app.use(cookieparser())
app.use("/api/v1", mainRouter)

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})