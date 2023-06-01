import * as http from "http";
import { restart } from "../model/model";

export const setRouter = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.method) {
        case "GET":
            checkGET();
            break;
    }

    async function checkGET() {
        if (req.url! == "/set") {
            console.log("SET");

            restart();
        }
    };
};
