import * as http from "http";
import { getRequestData } from "../getRequestData";
import { jsonController } from "../controllers/jsonController";
import { fileController } from "../controllers/fileController";
import * as fs from "fs";

export const imageRouter = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.method) {
        case "GET":
            checkGET();
            break;

        case "POST":
            checkPOST();
            break;

        case "PATCH":
            checkPatch();
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

        } else if (req.url!.match(/\/photos\/tags\/([0-9]+)/)) {
            console.log("GET TAGS FROM PHOTO");

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(jsonController.getTagsFromPhoto(parseInt(req.url!.split("/photos/tags/")[1])), null, 5));
        } else if (req.url!.match(/\/photos\/show\/([0-9]+)/)) {
            console.log("SHOW PHOTO");

            fs.readFile(jsonController.getPhotoPath(parseInt(req.url!.split("/photos/show/")[1])), function (err, data) {
                if (err) throw err;

                res.setHeader('Content-Type', 'image/jpeg');
                res.end(data);
            });
        }

    };

    async function checkPOST() {
        if (req.url == "/photos") {
            console.log("ADD PHOTO");

            let data = await fileController.uploadFile(req, res);
            let { fileArray, user, isProfilePhoto } = data;

            if (isProfilePhoto) {
                jsonController.deleteProfilePhoto(user);
            }

            for (const file of fileArray) {
                jsonController.addPhoto({
                    id: jsonController.getNewID(),
                    name: file.originalFilename || "",
                    type: file.mimetype || "",
                    path: "./files/" + user + "/" + file.newFilename,
                    user: user,
                    profile: isProfilePhoto,
                    history: [
                        {
                            date: new Date(),
                            status: "orginal"
                        }
                    ],
                    tags: []
                });
            }

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify({ status: true }, null, 5));
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

    function checkPatch() {
        if (req.url!.match(/\/photos\/([0-9]+)/)) {
            console.log("PATCH PHOTO");

            //jsonController.patchPhoto(parseInt(req.url!.split("/photos/")[1]), JSON.parse(getRequestData(req)));

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(jsonController.getOnePhoto(parseInt(req.url!.split("/photos/")[1])), null, 5));

        } else if (req.url!.match(/\/photos\/tags\/([0-9]+)/)) {
            console.log("PATCH TAGS FROM PHOTO");

            //jsonController.patchTagsFromPhoto(parseInt(req.url!.split("/photos/tags/")[1]), JSON.parse(getRequestData(req)));

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(jsonController.getOnePhoto(parseInt(req.url!.split("/photos/tags/")[1])), null, 5));
        }
    }
};
