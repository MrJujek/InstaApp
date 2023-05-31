import { photos, updateJSON } from "../model/model";
import { Photo } from "../model/model";

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

    deletePhoto: (id: number) => {
        photos.splice(photos.indexOf(photos.filter((photo) => photo.id == id)[0]), 1);

        return photos
    },

    patchPhoto: (id: number, photo: Photo) => {
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
        photos.filter((photo) => photo.user == user && photo.profile == true).forEach((photo) => {
            photo.profile = false;
        });
    }
}