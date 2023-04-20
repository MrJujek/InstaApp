import * as http from "http";
import formidable from "formidable";

export let fileController = {
    async uploadFile(req: http.IncomingMessage, res: http.ServerResponse) {
        return new Promise((resolve, reject) => {
            try {
                let form = formidable({
                    uploadDir: "./files",
                    keepExtensions: true
                });

                form.parse(req, function (err, fields, files) {
                    if (err) console.log(err);

                    let tmp: unknown = files.file;
                    let uploadedFile = tmp as File;

                    resolve(uploadedFile as File);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}