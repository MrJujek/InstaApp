import { photos } from "../model";
import { Photo } from "../model";

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

    addPhoto: (photo: Photo) => {
        photos.push(photo);
    },

    deletePhoto: (id: number) => {
        photos.splice(photos.indexOf(photos.filter((photo) => photo.id == id)[0]), 1);

        return photos
    },

    patchPhoto: (id: number, photo: Photo) => {
    }
}