import mongoose, {Connection} from "mongoose";

export default async (
    host: string,
    port: string | number,
    name: string,
    user: string,
    pass: string,
): Promise<Connection> =>  {

    return new Promise((resolve) => {
        let conn =  mongoose.createConnection(`mongodb://${user}:${pass}@${host}:${port}/${name}`);

        conn.on("open", () => {
            console.log(`Connected to MongoDB "${host}:${port}/${name}"`);
            resolve(conn);
        });
    });

}
