import * as http from "http"
import { router } from "./app/router"

const PORT = 3000

http
    .createServer((req, res) => {
        router(req, res)
    })
    .listen(PORT, () => {
        console.log("listen on 3000")
    })