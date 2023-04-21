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

                    console.log("fields", fields);
                    // console.log("files", files);

                    const { album } = fields;
                    const { file } = files;

                    const fileArray = Array.isArray(file) ? file : [file];

                    resolve({
                        fileArray,
                        album: album.toString()
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}


                    // let tmp: unknown = file;
                    // let uploadedFile = tmp as File;

                    // let oldPath = uploadedFile["path" as keyof typeof uploadedFile]

                    // console.log(typeof oldPath, oldPath);

                    // var newPath = 'new/path/file.txt'

                    // fs.rename(oldPath, newPath, function (err) {
                    //     if (err) throw err
                    //     console.log('Successfully renamed - AKA moved!')
                    // })