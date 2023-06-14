import * as http from "http";
import formidable from "formidable";
import * as fs from "fs";
import { jsonController } from "./jsonController";
import { updateJSON } from "../model/model";
import sharp from "sharp";

interface Upload {
    fileArray: formidable.File[];
    user: string;
    isProfilePhoto: boolean;
    description: string[];
    tags: string;
    filter?: string;
}

export let fileController = {
    async uploadFile(req: http.IncomingMessage, res: http.ServerResponse) {
        console.log("fileController - uploadFile");

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

                    const { user, photoType, tags, description, filter } = fields;
                    const { file } = files;

                    let fileArray = Array.isArray(file) ? file : [file];

                    const withFilters = await fileController.filterImages(String(filter), fileArray)
                    fileArray = withFilters ? withFilters : fileArray;

                    await fileController.moveFile(fileArray, user.toString());

                    if (photoType == "profile") {
                        console.log("profile photo");

                        jsonController.deleteProfilePhoto(user.toString());
                    }

                    await updateJSON();

                    resolve({
                        fileArray,
                        user: user.toString(),
                        isProfilePhoto: photoType == "profile" ? true : false,
                        description: [...description],
                        tags: tags.toString(),
                        filter: filter ? filter.toString() : undefined
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    },

    async filterImages(filter: string, fileArray: formidable.File[]) {
        console.log("filter", filter);

        switch (filter) {
            case "original":
                console.log("original");
                return fileArray;
            case "grayscale":
                console.log("grayscale");

                return new Promise<formidable.File[]>(async (resolve, reject) => {
                    try {
                        for (const file of fileArray) {
                            await sharp(file.filepath).grayscale().toFile(file.filepath + "-grayscale." + file.mimetype?.split("/")[1]);

                            file.filepath = file.filepath + "-grayscale." + file.mimetype?.split("/")[1];
                        }
                        resolve(fileArray);
                    } catch (error) {
                        reject(error);
                    }
                })
            case "flip":
                console.log("flip");

                return new Promise<formidable.File[]>(async (resolve, reject) => {
                    try {
                        for (const file of fileArray) {
                            await sharp(file.filepath).flip().toFile(file.filepath + "-flip." + file.mimetype?.split("/")[1]);

                            file.filepath = file.filepath + "-flip." + file.mimetype?.split("/")[1];
                        }
                        resolve(fileArray);
                    } catch (error) {
                        reject(error);
                    }
                })
            case "flop":
                console.log("flop");

                return new Promise<formidable.File[]>(async (resolve, reject) => {
                    try {
                        for (const file of fileArray) {
                            await sharp(file.filepath).flop().toFile(file.filepath + "-flop." + file.mimetype?.split("/")[1]);

                            file.filepath = file.filepath + "-flop." + file.mimetype?.split("/")[1];
                        }
                        resolve(fileArray);
                    } catch (error) {
                        reject(error);
                    }
                })
            case "negate":
                console.log("asdasd - negate");

                return new Promise<formidable.File[]>(async (resolve, reject) => {
                    try {
                        for (const file of fileArray) {
                            console.log("negate", file.filepath, file.mimetype?.split("/")[1]);

                            await sharp(file.filepath).toFormat("jpeg").jpeg({
                                quality: 100,
                                force: true,
                            }).jpeg().negate().toFile(file.filepath + "-negate.jpeg");

                            file.filepath = file.filepath + "-negate.jpeg";
                        }
                        resolve(fileArray);
                    } catch (error) {
                        reject(error);
                    }
                })
            case "tint":
                console.log("tint");

                return new Promise<formidable.File[]>(async (resolve, reject) => {
                    try {
                        for (const file of fileArray) {
                            await sharp(file.filepath).tint({ r: 0, g: 255, b: 0 }).toFile(file.filepath + "-tint." + file.mimetype?.split("/")[1]);

                            file.filepath = file.filepath + "-tint." + file.mimetype?.split("/")[1];
                        }
                        resolve(fileArray);
                    } catch (error) {
                        reject(error);
                    }
                })
            default:
                console.log("default");
                return fileArray;
        }
    },

    async moveFile(fileArray: formidable.File[], user: string) {
        console.log("fileController - moveFile");

        return new Promise(async (resolve, reject) => {
            try {
                if (!fs.existsSync("./files/" + user)) {
                    fs.mkdirSync("./files/" + user);
                }

                for (const file of fileArray) {
                    await fs.rename(file.filepath, "./files/" + user + "/" + file.newFilename, (err) => {
                        if (err) console.log(err);
                    });
                }

                await resolve(fileArray);
            } catch (error) {
                reject(error);
            }
        })
    },

    async deleteFile(id: number) {
        console.log("fileController - deleteFile");

        return new Promise((resolve, reject) => {
            try {
                if (jsonController.getOnePhoto(id)) {
                    const path = jsonController.getOnePhoto(id).path;
                    if (fs.existsSync(path)) {
                        fs.unlink(path, (err) => {
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
        console.log("fileController - createDefaultProfilePhoto");

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
        console.log("fileController - renameFiles");

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