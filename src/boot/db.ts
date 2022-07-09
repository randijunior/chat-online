import mongoose from "mongoose";
import container from "./container";

export default async () => {
    let { connection } = await mongoose.connect("mongodb://localhost:27017/", {});
    container.bind<mongoose.Connection>("conn").toConstantValue(connection);
}