import * as http from "http"
import { imageRouter } from "./app/routers/imageRouter"
import { tagsRouter } from "./app/routers/tagsRouter"

const PORT = 5000

http
    .createServer(async (req, res) => {
        if (req.url!.search("/photos") != -1) {
            await imageRouter(req, res)

        } else if (req.url!.search("/tags") != -1) {
            await tagsRouter(req, res)
        }
    })
    .listen(PORT, () => {
        console.log(`listen on port ${PORT}`)
    })