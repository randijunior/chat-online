import 'reflect-metadata';

import { Container } from 'inversify';
import mongoose from 'mongoose';

import dbFactory from './db';
import User, {getModel} from "../domain/model/user";


export default async function factory() {

    const db = await dbFactory("localhost", "2717", "test", "", "");

    const container = new Container();

    container.bind(mongoose.Connection).toConstantValue(db).whenTargetIsDefault();
    container.bind(<any>User).toDynamicValue(getModel).inSingletonScope().whenTargetIsDefault();

    return container;
};
