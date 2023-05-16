import formidable from "formidable";
import * as http from "http";
import { users } from "../model";
import { User } from "../model";
import * as bcrypt from 'bcryptjs';

export let userController = {
    register: async (data: string) => {
        let obj = JSON.parse(data);

        if (!obj.password || !obj.email || !obj.lastName || !obj.name) {
            return "error: missing data";

        } else {
            return await new Promise(async (resolve, reject) => {
                try {
                    const encryptedPassword = userController.encryptPass(obj.password);

                    let userData: User = {
                        id: userController.getNewID(),
                        name: obj.name,
                        lastName: obj.lastName,
                        email: obj.email,
                        password: await encryptedPassword,
                        confirmed: false
                    }

                    users.push(userData);

                    resolve(users);
                } catch (error) {
                    reject(error);
                }
            });

        }
    },

    getNewID: () => {
        if (users.length == 0) return 1;

        return users[users.length - 1].id + 1;
    },

    encryptPass: async (password: string) => {
        const encryptedPassword = await bcrypt.hash(password, 10);

        return encryptedPassword;
    }
}