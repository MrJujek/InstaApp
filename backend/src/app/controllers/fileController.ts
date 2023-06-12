import * as http from "http";
import formidable from "formidable";
import * as fs from "fs";
import { jsonController } from "./jsonController";
import { updateJSON } from "../model/model";

interface Upload {
    fileArray: formidable.File[];
    user: string;
    isProfilePhoto: boolean;
    description: string[];
    tags: string;
}

export let fileController = {
    async uploadFile(req: http.IncomingMessage, res: http.ServerResponse) {
        console.log("uploadFile");

        return new Promise<Upload>((resolve, reject) => {
            try {
                let form = formidable({
                    uploadDir: "./files",
                    keepExtensions: true,
                    multiples: true
                });

                form.parse(req, async function (err, fields, files) {
                    if (err) console.log(err);

                    console.log("fields", fields);


                    const { user, photoType, tags, description } = fields;
                    const { file } = files;

                    console.log("user", user);
                    console.log("photoType", photoType);
                    console.log("tags", tags);
                    console.log("description", description);


                    const fileArray = Array.isArray(file) ? file : [file];

                    await fileController.moveFile(fileArray, user.toString());

                    if (photoType == "profile") {
                        jsonController.deleteProfilePhoto(user.toString());
                    }

                    await updateJSON();

                    resolve({
                        fileArray,
                        user: user.toString(),
                        isProfilePhoto: photoType == "profile" ? true : false,
                        description: [...description],
                        tags: tags.toString(),
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    },

    async moveFile(fileArray: formidable.File[], user: string) {
        console.log("moveFile");

        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync("./files/" + user)) {
                    fs.mkdirSync("./files/" + user);
                }

                console.log("fileArray", fileArray);


                for (const file of fileArray) {
                    fs.rename(file.filepath, "./files/" + user + "/" + file.newFilename, (err) => {
                        if (err) console.log(err);

                        resolve(fileArray);
                    });
                }
            } catch (error) {
                reject(error);
            }
        })
    },

    async deleteFile(id: number) {
        console.log("deleteFile");

        return new Promise((resolve, reject) => {
            try {
                if (jsonController.getOnePhoto(id)) {
                    if (fs.existsSync(jsonController.getOnePhoto(id).path)) {
                        fs.unlink(jsonController.getOnePhoto(id).path, (err) => {
                            if (err) throw (err);

                            resolve("File removed from array");
                        });
                    }
                }
            } catch (error) {
                reject(error);
            }
        })
    },

    async createDefaultProfilePhoto(user: string) {
        console.log("createDefaultProfilePhoto");

        return new Promise(async (resolve, reject) => {
            try {
                if (!fs.existsSync("./files/" + user)) {
                    fs.mkdirSync("./files/" + user);
                }

                jsonController.addPhoto({
                    id: jsonController.getNewID(),
                    name: "defaultProfilePhoto.png",
                    type: "image/png",
                    path: "./files/" + user + "/defaultProfilePhoto.png",
                    user: user,
                    profile: true,
                    history: [
                        {
                            date: new Date(),
                            status: "orginal"
                        }
                    ],
                    tags: [],
                    description: []
                });

                await updateJSON();

                fs.copyFile("./assets/defaultProfilePhoto.png", "./files/" + user + "/defaultProfilePhoto.png", (err) => {
                    if (err) throw (err);

                    resolve("Default profile photo created");
                });
            } catch (error) {
                reject(error);
            }
        })
    },

    async renameFiles(lastEmail: string, newEmail: string) {
        console.log("renameFiles");

        return new Promise((resolve, reject) => {
            try {
                if (fs.existsSync("./files/" + lastEmail)) {
                    fs.rename("./files/" + lastEmail, "./files/" + newEmail, (err) => {
                        if (err) throw (err);

                        resolve("Files renamed");
                    });
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}