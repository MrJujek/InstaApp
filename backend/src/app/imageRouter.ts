import * as http from "http";
import { getRequestData } from "./getRequestData";
import { jsonController } from "./jsonController";
import { fileController } from "./fileController";

export const imageRouter = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    // console.log(req.url);

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
            checkDelete();
            break;
    }

    async function checkGET() {
        if (req.url == "/photos") {
            console.log("GET ALL PHOTOS");

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(jsonController.getAllPhotos(), null, 5));

        } else if (req.url!.match(/\/photos\/([0-9]+)/)) {
            console.log("GET ONE PHOTO");

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(jsonController.getOnePhoto(parseInt(req.url!.split("/photos/")[1])), null, 5));
        }
    };

    async function checkPOST() {
        if (req.url == "/photos") {
            console.log("ADD PHOTO");

            let data = await fileController.uploadFile(req, res);
            let { fileArray, album } = data;

            // console.log("BBBBBBBB");
            // console.log(fileArray[0].filepath, album);
            // console.log("./files/" + album + "/" + fileArray[0].newFilename);

            for (const file of fileArray) {
                jsonController.addPhoto({
                    id: jsonController.getNewID(),
                    name: file.originalFilename || "",
                    type: file.mimetype || "",
                    path: "./files/" + album + "/" + file.newFilename,
                    album: album,
                    history: [
                        {
                            date: new Date(),
                            status: "orginal"
                        }
                    ]
                });
            }
        }
    }

    function checkDelete() {
        if (req.url!.match(/\/photos\/([0-9]+)/)) {
            console.log("DELETE PHOTO");

            fileController.deleteFile(parseInt(req.url!.split("/photos/")[1]));

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(jsonController.deletePhoto(parseInt(req.url!.split("/photos/")[1])), null, 5));
        }
    }
};
