import * as http from "http";
import { getRequestData } from "../getRequestData";
import { tagsController } from "../controllers/tagsController";

export const tagsRouter = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.method) {
        case "GET":
            checkGET();
            break;

        case "POST":
            checkPOST();
            break;

        case "PATCH":
            break;
    }

    async function checkGET() {
        if (req.url == "/tags/raw") {
            console.log("GET ALL TAGS - RAW");

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(tagsController.getAllTagsRaw(), null, 5));

        } else if (req.url == "/tags") {
            console.log("GET ALL TAGS - OBJECTS");

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(tagsController.getAllTagsObjects(), null, 5));

        } else if (req.url!.match(/\/tags\/([0-9]+)/)) {
            console.log("GET ONE TAG");

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(tagsController.getOneTag(parseInt(req.url!.split("/tags/")[1])), null, 5));
        }
    };

    async function checkPOST() {
        if (req.url == "/tags") {
            console.log("POST TAG");

            let data = await tagsController.getNewTag(req, res);
            let { newTag } = data;

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(tagsController.addNewTag("#" + newTag), null, 5));
        }
    };
};
