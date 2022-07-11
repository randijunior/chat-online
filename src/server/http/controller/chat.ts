import {BaseHttpController, controller, httpGet, interfaces, request, response} from "inversify-express-utils";
import * as express from "express";
import {inject} from "inversify";
import User from "../../../domain/model/user";
import mongoose from "mongoose";

@controller("/chat")
export class ChatController extends BaseHttpController {
    constructor(
        @inject(User) private user: mongoose.Model<User & mongoose.Document>
    ){
        super();
    }
    @httpGet("/")
    public async hello(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        return res.send("Olá");
    }
}
