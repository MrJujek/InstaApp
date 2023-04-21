import * as http from "http"
import { router } from "./app/router"

const PORT = 5000

http
    .createServer((req, res) => {
        router(req, res)
    })
    .listen(PORT, () => {
        console.log("listen on " + PORT)
    })