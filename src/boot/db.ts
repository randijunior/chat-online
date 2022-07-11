import mongoose from "mongoose";

export default async () => {
    let { connection } = await mongoose.connect("mongodb://localhost:27017/", {});
    return connection;
}
