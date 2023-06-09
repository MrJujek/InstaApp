import { photos, updateJSON } from "../model/model";
import { Photo } from "../model/model";
import { fileController } from "./fileController";

export let jsonController = {
    getAllPhotos: () => {
        return photos;
    },

    getOnePhoto: (id: number) => {
        return photos.filter((photo) => photo.id == id)[0];
    },

    getNewID: () => {
        if (photos.length == 0) return 1;

        return photos[photos.length - 1].id + 1;
    },

    addPhoto: async (photo: Photo) => {
        photos.push(photo);

        return photos;
    },

    deletePhoto: async (id: number) => {
        await fileController.deleteFile(id)

        photos.splice(photos.indexOf(photos.filter((photo) => photo.id == id)[0]), 1);
    },

    getTagsFromPhoto: (id: number) => {
        return photos.filter((photo) => photo.id == id)[0].tags;
    },

    getPhotoPath: (id: number) => {
        let toReturn = photos.filter((photo) => photo.id == id);

        if (toReturn.length == 0) {
            return ""
        };

        return toReturn[0].path;
    },

    deleteProfilePhoto: (user: string) => {
        console.log("jsonController - deleteProfilePhoto", user);

        photos.filter((photo) => photo.user == user && photo.profile == true).forEach((photo) => {
            photo.profile = false;

            jsonController.deletePhoto(photo.id);

            return
        });

        return
    },

    async renameFiles(lastEmail: string, newEmail: string) {
        console.log("jsonController - renameFiles");

        return new Promise((resolve, reject) => {
            try {
                for (let photo of photos) {
                    if (photo.user == lastEmail) {
                        photo.user = newEmail;

                        const temp = photo.path.split(lastEmail);
                        photo.path = temp[0] + newEmail + temp[1];
                    }
                }

                updateJSON();

                resolve("Files renamed");
            } catch (error) {
                reject(error);
            }
        })
    }
}