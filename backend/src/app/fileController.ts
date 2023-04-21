import * as http from "http";
import formidable from "formidable";
import * as fs from "fs";

interface Upload {
    fileArray: formidable.File[];
    album: string;
}

export let fileController = {
    async uploadFile(req: http.IncomingMessage, res: http.ServerResponse) {
        return new Promise<Upload>((resolve, reject) => {
            try {
                let form = formidable({
                    uploadDir: "./files",
                    keepExtensions: true
                });

                form.parse(req, function (err, fields, files) {
                    if (err) console.log(err);

                    const { album } = fields;
                    const { file } = files;

                    const fileArray = Array.isArray(file) ? file : [file];

                    let x = fileController.moveFile(fileArray, album.toString());
                    console.log("x", x);


                    resolve({
                        fileArray,
                        album: album.toString()
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    },

    async moveFile(fileArray: formidable.File[], album: string) {
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync("./files/" + album)) {
                    fs.mkdirSync("./files/" + album);
                }

                for (const file of fileArray) {
                    fs.rename(file.filepath, "./files/" + album + "/" + file.newFilename, (err) => {
                        if (err) console.log(err);

                        file.filepath = "./files/" + album + "/" + file.newFilename;
                        console.log("aa", fileArray);

                        resolve(fileArray);
                    });
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}