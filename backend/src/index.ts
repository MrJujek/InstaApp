import * as http from "http"
import * as dotenv from "dotenv"
import { imageRouter } from "./app/routers/imageRouter"
import { tagsRouter } from "./app/routers/tagsRouter"
import { userRouter } from "./app/routers/userRouter"
import * as bcrypt from 'bcryptjs';

dotenv.config()

http
    .createServer(async (req, res) => {
        if (req.url!.search("/photos") != -1) {
            await imageRouter(req, res)

        } else if (req.url!.search("/tags") != -1) {
            await tagsRouter(req, res)

        } else if (req.url!.search("/user") != -1) {
            await userRouter(req, res)
        }
    })
    .listen(process.env.PORT, () => {
        console.log(`listen on port ${process.env.PORT}`)
    })