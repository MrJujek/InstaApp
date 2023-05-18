import * as http from "http";

export const getRequestData = async (req: http.IncomingMessage) => {
    return new Promise<string>((resolve, reject) => {
        try {
            let body: string = "";

            req.on("data", (part: any) => {
                body += part.toString();
            });

            req.on("end", () => {
                resolve(body);
            });

        } catch (error) {
            reject(error);
        }
    })
}