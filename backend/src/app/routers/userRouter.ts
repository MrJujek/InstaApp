import * as http from "http";
import { getRequestData } from "../getRequestData";
import { userController } from "../controllers/userController";
import { users } from "../model/model";

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
            console.log("GET ALL USERS");

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(await userController.getAllUsers(), null, 5));

        } else if (req.url!.match(/\/user\/confirm\/([0-9a-zA-Z.\-\_]+)/)) {
            console.log("GET CONFIRM");

            const token = req.url!.split("/user/confirm/")[1];

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(await userController.verifyToken(token), null, 5));

        } else if (req.url!.match(/\/user\/([0-9]+)/)) {
            console.log("GET ONE USER");

            const id = parseInt(req.url!.split("/user/")[1]);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(await userController.getOneUser(id), null, 5));

        } else if (req.url!.match(/\/user\/email\/([0-9a-zA-Z@.\-\_]+)/)) {
            console.log("GET USER ID BY EMAIL");

            const email = req.url!.split("/user/email/")[1];

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(await userController.getUserIdByEmail(email), null, 5));
        }
    };

    async function checkPOST() {
        if (req.url == "/user/register") {
            console.log("POST REGISTER");

            const data = await getRequestData(req);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(await userController.register(data), null, 5));

        } else if (req.url == "/user/login") {
            console.log("POST LOGIN");

            const data = await getRequestData(req);
            let login = await userController.login(data);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(login, null, 5));
        } else if (req.url == "/user/authenticate") {
            console.log("POST AUTHENTICATE");

            const data = await getRequestData(req);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(await userController.authenticate(data), null, 5));
        }
    };
};