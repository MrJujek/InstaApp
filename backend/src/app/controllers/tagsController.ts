import { tagsRaw, updateJSON } from "../model/model";
import { TagsObject } from "../model/model";
import formidable from "formidable";
import * as http from "http";
import { tagsObjects } from "../model/model";

interface GetTag {
    newTag: string;
}

export let tagsController = {
    getAllTagsRaw: () => {
        return tagsRaw;
    },

    getAllTagsObjects: async () => {
        tagsObjects.length = 0;

        for (const tag in tagsRaw) {
            tagsObjects.push({
                id: tagsRaw.indexOf(tagsRaw[tag]),
                name: tagsRaw[tag],
                popularity: Math.random() * 100
            });
        }

        await updateJSON();

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

    addNewTag: async (newTag: string) => {
        if (tagsRaw.includes(newTag)) return tagsRaw;

        tagsRaw.push(newTag);
        tagsObjects.push({
            id: tagsRaw.length + 1,
            name: newTag,
            popularity: Math.random() * 100
        });

        await updateJSON();

        return tagsRaw;
    }
}