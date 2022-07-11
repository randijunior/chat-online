import {inject, injectable} from "inversify";
import User from "../model/user";
import mongoose from "mongoose";

@injectable()
export default class ChatService {
    constructor(
    ) {}
    // TODO
    public async find() {}
    public async list() {}
    public async create () {}
    public async update () {}
    public async delete () {}
}
