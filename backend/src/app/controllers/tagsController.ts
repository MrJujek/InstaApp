import { tagsRaw } from "../model";
import { TagsObject } from "../model";
import formidable from "formidable";
import * as http from "http";

interface GetTag {
    newTag: string;
}

export let tagsController = {
    getAllTagsRaw: () => {
        return tagsRaw;
    },

    getAllTagsObjects: () => {
        let tagsObject: TagsObject[] = [];

        for (const tag in tagsRaw) {
            tagsObject.push({
                id: tagsRaw.indexOf(tagsRaw[tag]),
                name: tagsRaw[tag],
                popularity: Math.random() * 100
            });
        }

        return tagsObject;
    },

    getOneTag: (id: number) => {
        return tagsRaw[id];
    },

    getNewTag: (req: http.IncomingMessage, res: http.ServerResponse) => {
        return new Promise<GetTag>((resolve, reject) => {
            try {
                let form = formidable({});

                form.parse(req, function (err, fields, files) {
                    if (err) console.log(err);

                    const { newTag } = fields;

                    resolve({
                        newTag: newTag.toString()
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    },

    addNewTag: (newTag: string) => {
        tagsRaw.push(newTag);

        return tagsRaw;
    }
}