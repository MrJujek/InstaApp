import formidable from "formidable";
import * as http from "http";
import { users } from "../model";
import { User } from "../model";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv"
import { fileController } from "./fileController";

dotenv.config({ path: "/home/ubuntu/Desktop/github/InstaApp/backend/.env" })

export let userController = {
    getAllUsers: async () => {
        return users;
    },

    getOneUser: async (id: number) => {
        return users.filter(user => user.id == id);
    },

    getUserIdByEmail: async (email: string) => {
        let user = users.filter(user => user.email == email);

        if (user.length == 0) return "error: user with that email doesn't exist";

        return user[0].id;
    },

    register: async (data: string): Promise<string> => {
        let obj = JSON.parse(data);

        for (let i = 0; i < users.length; i++) {
            if (users[i].email == obj.email) {
                return "error: user with that email already exists";
            }
        }

        if (!obj.password || !obj.email || !obj.lastName || !obj.name) {
            return "error: missing data";

        } else {
            return await new Promise<string>(async (resolve, reject) => {
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

                    fileController.createDefaultProfilePhoto(userData.email);

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

        users.forEach(user => {
            if (user.email == obj.email) {
                obj.name = user.name;
                obj.lastName = user.lastName;
                return;
            }

        });

        let message: string = "Incorrect email or password";

        let toReturn: { logged: boolean, message: string, token?: string } = { logged: false, message: "" };

        users.forEach(user => {
            if (user.email == obj.email) {
                if (bcrypt.compareSync(obj.password, user.password)) {
                    if (user.confirmed == true) {
                        message = "Logged in";
                        toReturn.logged = true;
                        toReturn.token = userController.createTokenToLogin(obj);
                    } else {
                        message = "User not confirmed";
                    }
                }
            }
        });

        toReturn.message = message;

        return toReturn;
    },

    createTokenToLogin: (obj: { email: string, password: string, name: string, lastName: string }) => {
        let token = jwt.sign(
            {
                email: obj.email,
                password: obj.password,
                name: obj.name,
                lastName: obj.lastName
            },
            String(process.env.TOKEN_KEY),
            {
                expiresIn: "1h"
            }
        );

        return token;
    },

    authenticate: async (token: string) => {
        let toReturn: { status: boolean, data?: { email?: string, name?: string, lastName?: string, password?: string } } = {
            status: false
        }

        try {
            let decoded = await jwt.verify(JSON.parse(token).token, String(process.env.TOKEN_KEY)) as any;
            // console.log("decoded", decoded);

            toReturn.status = true;
            toReturn.data = {
                email: decoded["email"],
                name: decoded["name"],
                lastName: decoded["lastName"],
                password: decoded["password"]
            };

            return toReturn;
        }
        catch (ex) {
            console.log(ex);

            return toReturn;
        }
    }
}