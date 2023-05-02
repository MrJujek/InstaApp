import * as http from "http";

export const getRequestData = async (req: http.IncomingMessage) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";

            req.on("data", (part: any) => {
                body += part.toString();
            });

            req.on("end", () => {
                // mamy dane i zwracamy z promisy
                resolve(body);
            });

        } catch (error) {
            reject(error);
        }
    })
}