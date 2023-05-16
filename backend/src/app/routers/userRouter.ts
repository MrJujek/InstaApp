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
        // if (req.url == "/tags/raw") {
        //     console.log("GET ALL TAGS - RAW");

        //     res.writeHead(200, { "Content-type": "application/json" });
        //     res.end(JSON.stringify(tagsController.getAllTagsRaw(), null, 5));

        // } else if (req.url == "/tags") {
        //     console.log("GET ALL TAGS - OBJECTS");

        //     res.writeHead(200, { "Content-type": "application/json" });
        //     res.end(JSON.stringify(tagsController.getAllTagsObjects(), null, 5));

        // } else if (req.url!.match(/\/tags\/([0-9]+)/)) {
        //     console.log("GET ONE TAG");

        //     res.writeHead(200, { "Content-type": "application/json" });
        //     res.end(JSON.stringify(tagsController.getOneTag(parseInt(req.url!.split("/tags/")[1])), null, 5));
        // }
    };

    async function checkPOST() {
        if (req.url == "/user/register") {
            console.log("POST REGISTER");

            const data = await getRequestData(req);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(userController.register(data), null, 5));
        }
    };
};
