import { tagsRaw } from "../model";
import { TagsObject } from "../model";
import formidable from "formidable";
import * as http from "http";
import { tagsObjects } from "../model";

interface GetTag {
    newTag: string;
}

export let tagsController = {
    getAllTagsRaw: () => {
        return tagsRaw;
    },

    getAllTagsObjects: () => {
        for (const tag in tagsRaw) {
            tagsObjects.push({
                id: tagsRaw.indexOf(tagsRaw[tag]),
                name: tagsRaw[tag],
                popularity: Math.random() * 100
            });
        }

        return tagsObjects;
    },

    getOneTag: (id: number) => {
        return tagsObjects[id];
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
        if (tagsRaw.includes(newTag)) return tagsRaw;

        tagsRaw.push(newTag);
        tagsObjects.push({
            id: tagsRaw.length + 1,
            name: newTag,
            popularity: Math.random() * 100
        });

        return tagsRaw;
    }
}