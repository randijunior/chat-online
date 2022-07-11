import {getModelForClass, modelOptions, prop, Severity} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { interfaces } from 'inversify';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class User {
    @prop()
    name = "";
}
export default User;

export function getModel(context: interfaces.Context): mongoose.Model<User & mongoose.Document> {
    const connection = context.container.get(mongoose.Connection);

    // @ts-ignore
    return getModelForClass(User, {
       existingConnection: connection,
       schemaOptions: {
           collection: "users",
           timestamps: true,
       }
    });
}
