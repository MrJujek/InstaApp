import * as http from "http"
import * as dotenv from "dotenv"
import { imageRouter } from "./app/routers/imageRouter"
import { tagsRouter } from "./app/routers/tagsRouter"
import { userRouter } from "./app/routers/userRouter"
import { profileRouter } from "./app/routers/profileRouter"
import { setRouter } from "./app/routers/setRouter"

dotenv.config()

http
    .createServer(async (req, res) => {
        console.log(req.url);
        console.log(req.method);

        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Request-Method', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
        // res.setHeader('Access-Control-Allow-Headers', '*');

        // if (req.method === 'OPTIONS') {
        //     res.writeHead(200);
        //     res.end();
        //     return;
        // }

        if (req.url!.search("/photos") != -1) {
            await imageRouter(req, res);

        } else if (req.url!.search("/tags") != -1) {
            await tagsRouter(req, res);

        } else if (req.url!.search("/user") != -1) {
            await userRouter(req, res);

        } else if (req.url!.search("/profile") != -1) {
            await profileRouter(req, res);

        } else if (req.url!.search("/set") != -1) {
            await setRouter(req, res);
        }
    })
    .listen(process.env.PORT, () => {
        console.log(`listen on port ${process.env.PORT}`)
    })