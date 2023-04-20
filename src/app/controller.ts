import { photos } from "./model";

export let controller = {
    // add: (data: any) => {
    //     let obj = JSON.parse(data)
    //     //console.log(obj);
    //     obj.id = tasks[tasks.length - 1].id + 1

    //     tasks.push(obj)

    //     return `added`
    // },

    // delete: (id: number) => {
    //     //console.log(id);
    //     for (let i = 0; i < tasks.length; i++) {
    //         if (tasks[i].id == id) {
    //             tasks.splice(i, 1)

    //             return `task ${id} deleted`
    //         }
    //     }
    //     return `task ${id} not found`
    // },

    // patch: (data: any) => {
    //     //console.log(data);
    //     let obj = JSON.parse(data)

    //     for (let i = 0; i < tasks.length; i++) {
    //         if (tasks[i].id == obj.id) {
    //             tasks[i] = obj

    //             return `task ${obj.id} updated`
    //         }
    //     }
    //     return `task ${obj.id} not found`
    // },

    // getall: () => {
    //     return tasks
    // },

    // get: (id: number) => {
    //     for (let i = 0; i < tasks.length; i++) {
    //         if (tasks[i].id == id) {
    //             return tasks[i]
    //         }
    //     }
    //     return `task ${id} not found`
    // },

    getAllPhotos: () => {
        return photos;
    },

    getOnePhoto: (id: number) => {
        console.log(id);

        return photos.filter((photo) => photo.id == id)[0];
    },

    getExtensionType: (extension: string) => {
        switch (extension) {
            case "css":
                return "text/css";
            case "js":
                return "text/javascript";
            case "html":
                return "text/html";
            default:
                return "text/plain";
        }
    }

}