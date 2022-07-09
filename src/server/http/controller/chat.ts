import {controller, httpGet, interfaces, request, response} from "inversify-express-utils";
import * as express from "express";

@controller("/chat")
export class ChatController implements interfaces.Controller {
    constructor(){}
    @httpGet("/")
    private hello(
        @request() req: express.Request,
        @response() res: express.Response
    ) {
        return res.send("Olá");
    }
}