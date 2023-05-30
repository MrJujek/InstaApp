import * as http from "http";
import formidable from "formidable";
import * as fs from "fs";
import { jsonController } from "./jsonController";

interface Upload {
    fileArray: formidable.File[];
    user: string;
}

export let fileController = {
    async uploadFile(req: http.IncomingMessage, res: http.ServerResponse) {
        console.log("uploadFile");

        return new Promise<Upload>((resolve, reject) => {
            try {
                let form = formidable({
                    uploadDir: "./files",
                    keepExtensions: true
                });

                form.parse(req, function (err, fields, files) {
                    if (err) console.log(err);

                    const { user } = fields;
                    const { file } = files;

                    const fileArray = Array.isArray(file) ? file : [file];

                    fileController.moveFile(fileArray, user.toString());

                    resolve({
                        fileArray,
                        user: user.toString()
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
    }
}