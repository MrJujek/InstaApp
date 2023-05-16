import * as http from "http";
import { getRequestData } from "../getRequestData";
import { userController } from "../controllers/userController";
import { users } from "../model";

export const userRouter = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.method) {
        case "GET":
            checkGET();
            break;

        case "POST":
            checkPOST();
            break;
    }

    async function checkGET() {
        if (req.url! == "/user") {
            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(await userController.getAllUsers(), null, 5));

        } else if (req.url!.match(/\/user\/confirm\/([0-9a-zA-Z.\-\_]+)/)) {
            console.log("GET CONFIRM");

            const token = req.url!.split("/user/confirm/")[1];

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(await userController.verifyToken(token), null, 5));
        }
    };

    async function checkPOST() {
        if (req.url == "/user/register") {
            console.log("POST REGISTER");

            const data = await getRequestData(req);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(await userController.register(data), null, 5));
        }
    };
};
