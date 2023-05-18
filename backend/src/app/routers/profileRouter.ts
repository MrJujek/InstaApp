import * as http from "http";
import { getRequestData } from "../getRequestData";
import { userController } from "../controllers/userController";
import { fileController } from "../controllers/fileController";
import { users } from "../model";

export const profileRouter = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.method) {
        case "GET":
            checkGET();
            break;

        case "POST":
            checkPOST();
            break;

        case "PATCH":
            checkPATCH();
            break;
    }

    async function checkGET() {
        if (req.url! == "/profile") {
            console.log("GET PROFILE");

        }
    };

    async function checkPOST() {
        if (req.url == "/profile") {
            console.log("ADD PROFILE PHOTO");

            // let data = await fileController.uploadFile(req, res);
            // let { fileArray, album } = data;

            // for (const file of fileArray) {
            //     jsonController.addPhoto({
            //         id: jsonController.getNewID(),
            //         name: file.originalFilename || "",
            //         type: file.mimetype || "",
            //         path: "./files/" + album + "/" + file.newFilename,
            //         album: album,
            //         history: [
            //             {
            //                 date: new Date(),
            //                 status: "orginal"
            //             }
            //         ],
            //         tags: []
            //     });
            // }
        }
    };

    async function checkPATCH() {
        console.log("PATCH PROFILE");

    };
};
