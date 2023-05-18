import formidable from "formidable";
import * as http from "http";
import { users } from "../model";
import { User } from "../model";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv"

dotenv.config({ path: "/home/ubuntu/Desktop/github/InstaApp/backend/.env" })

export let userController = {
    getAllUsers: async () => {
        return users;
    },

    register: async (data: string) => {
        let obj = JSON.parse(data);

        for (let i = 0; i < users.length; i++) {
            if (users[i].email == obj.email) {
                return "error: user with that email already exists";
            }
        }

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

                    resolve("Confirm your account here:https://dev.juliandworzycki.pl/api/user/confirm/" + await userController.createTokenToConfirm(obj.email));
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
    },

    createTokenToConfirm: async (email: string) => {
        let token = await jwt.sign(
            {
                email: email
            },
            String(process.env.TOKEN_KEY),
            {
                expiresIn: "1m"
            }
        );

        return token;
    },

    verifyToken: async (token: string) => {
        try {
            let decoded = await jwt.verify(token, String(process.env.TOKEN_KEY)) as { email: string, iat: number, exp: number };

            userController.confirmUser(decoded["email"]);

            return "User confirmed";
        }
        catch (ex) {
            return "Error while verifying token";
        }
    },

    confirmUser: async (email: string) => {
        users.forEach(user => {
            if (user.email == email) {
                user.confirmed = true;
            }
        });

        return users.filter(user => user.email == email);
    },

    login: async (data: string) => {
        let obj = JSON.parse(data);
        let message: string = "";
        let bool: boolean = false;

        let toReturn: { message: string, token?: string } = { message: "" };

        users.forEach(user => {
            if (user.email == obj.email) {
                bool = true;

                if (bcrypt.compareSync(obj.password, user.password)) {
                    if (user.confirmed == true) {
                        message = "Logged in";

                        toReturn.token = userController.createTokenToLogin(obj.email);
                    } else {
                        message = "User not confirmed";
                    }
                }
            }
        });

        if (!bool) {
            message = "Incorrect email or password";
        }

        toReturn.message = message;

        return toReturn;
    },

    createTokenToLogin: (email: string) => {
        let token = jwt.sign(
            {
                email: email
            },
            String(process.env.TOKEN_KEY),
            {
                expiresIn: "1h"
            }
        );

        return token;
    }
}