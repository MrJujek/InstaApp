import { photos } from "./model";

export let jsonController = {
    getAllPhotos: () => {
        return photos;
    },

    getOnePhoto: (id: number) => {
        return photos.filter((photo) => photo.id == id)[0];
    }
}