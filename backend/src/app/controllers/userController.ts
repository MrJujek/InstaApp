import formidable from "formidable";
import * as http from "http";
import { users } from "../model/model";
import { User } from "../model/model";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv"
import { fileController } from "./fileController";
import { updateJSON, url } from "../model/model";

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

    signup: async (data: string): Promise<{ registered: boolean, message: string }> => {
        let obj = JSON.parse(data);
        console.log(obj);


        for (let i = 0; i < users.length; i++) {
            if (users[i].nickName == obj.nickName) {
                return { registered: false, message: "User with that nickname already exists." };
            }
            if (users[i].email == obj.email) {
                return { registered: false, message: "User with that email already exists." };
            }
        }

        if (!obj.password || !obj.email || !obj.lastName || !obj.name || !obj.nickName) {
            return { registered: false, message: "Missing data." };

        } else {
            return await new Promise<{ registered: boolean, message: string, link?: string }>(async (resolve, reject) => {
                try {
                    const encryptedPassword = userController.encryptPass(obj.password);

                    let userData: User = {
                        id: userController.getNewID(),
                        name: obj.name,
                        lastName: obj.lastName,
                        email: obj.email,
                        nickName: obj.nickName,
                        password: await encryptedPassword,
                        confirmed: false
                    }

                    users.push(userData);

                    fileController.createDefaultProfilePhoto(userData.email);

                    await updateJSON();

                    resolve({ registered: true, message: "Successfuly registered!", link: url + "/user/confirm/" + await userController.createTokenToConfirm(obj.email) });
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

        await updateJSON();

        return users.filter(user => user.email == email);
    },

    signin: async (data: string) => {
        let obj = JSON.parse(data);
        console.log("signin - obj", obj);

        users.forEach(user => {
            console.log("user", user);

            if (user.email == obj.login) {
                console.log("user.email == obj.login", user.email == obj.login);

                obj.name = user.name;
                obj.lastName = user.lastName;
                obj.nickname = user.nickName;
                obj.email = user.email;
                return;
            }
            if (user.nickName == obj.login) {
                console.log("user.nickname == obj.login", user.nickName == obj.login);
                obj.name = user.name;
                obj.lastName = user.lastName;
                obj.email = user.email;
                obj.nickname = user.nickName;
                return;
            }
        });

        let message: string = "Incorrect credentials.";

        let toReturn: { logged: boolean, message: string, token?: string } = { logged: false, message };

        if (obj.name && obj.lastName && obj.email && obj.password && obj.nickname) {
            users.forEach(user => {
                if (user.email == obj.email || user.nickName == obj.nickname) {
                    if (bcrypt.compareSync(obj.password, user.password)) {
                        if (user.confirmed == true) {
                            message = "Succesfuly logged in!";
                            toReturn.logged = true;
                            toReturn.token = userController.createTokenToLogin(obj);
                        } else {
                            message = "User is not confirmed.";
                        }
                    }
                }
            });
        }

        toReturn.message = message;

        return toReturn;
    },

    createTokenToLogin: (obj: { email: string, password: string, name: string, lastName: string, nickName: string }) => {
        console.log("create token to login - obj", obj);

        let token = jwt.sign(
            {
                email: obj.email,
                password: obj.password,
                name: obj.name,
                lastName: obj.lastName,
                nickName: obj.nickName
            },
            String(process.env.TOKEN_KEY),
            {
                expiresIn: "30m"
            }
        );

        return token;
    },

    authenticate: async (token: string) => {
        let toReturn: { status: boolean, data?: { email?: string, name?: string, lastName?: string, password?: string, nickName?: string } } = {
            status: false
        }

        try {
            let decoded = await jwt.verify(JSON.parse(token).token, String(process.env.TOKEN_KEY)) as any;

            toReturn.status = true;
            toReturn.data = {
                email: decoded["email"],
                name: decoded["name"],
                lastName: decoded["lastName"],
                password: decoded["password"],
                nickName: decoded["nickName"]
            };

            return toReturn;
        }
        catch (ex) {
            console.log("ex", ex);

            return toReturn;
        }
    }
}