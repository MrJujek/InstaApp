import * as http from "http";
import { getRequestData } from "./getRequestData";
import { jsonController } from "./jsonController";
import { fileController } from "./fileController";
import formidable from "formidable";

export const router = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    console.log(req.url);

    switch (req.method) {
        case "GET":
            checkGET();
            break;

        case "POST":
            checkPOST();
            break;

        case "PATCH":
            break;

        case "DELETE":
            break;
    }

    function checkGET() {
        if (req.url == "/api/photos") {
            console.log("GET ALL PHOTOS");

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(jsonController.getAllPhotos(), null, 5));

        } else if (req.url!.match(/\/api\/photos\/([0-9]+)/)) {
            console.log("GET ONE PHOTO");

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(jsonController.getOnePhoto(parseInt(req.url!.split("/api/photos/")[1])), null, 5));
        }
    };

    function checkPOST() {
        if (req.url == "/api/photos") {
            console.log("ADD PHOTO");

            const form = formidable({});

            form.parse(req, (err, fields, files) => {
                if (err) {
                    console.log(err);
                }
                console.log(fields, files);
            });

        }
    }



};
