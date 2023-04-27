export const getRequestData = async (req: any) => {
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