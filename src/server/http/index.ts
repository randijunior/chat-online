import "reflect-metadata";
import {InversifyExpressServer} from "inversify-express-utils";
import * as bodyParser from 'body-parser';
import express from "express";

import "./controller/chat";
import { Container } from "inversify";

export default class Server {
    server: InversifyExpressServer;
    app: express.Application;

    constructor(container: Container) {
        this.server = new InversifyExpressServer(container);
        this.server.setConfig((app) => {
            app.use(bodyParser.urlencoded({extended: true}));
            app.use(bodyParser.json());
        });
        this.app = this.server.build();
    }

    listen(port: number) {
        this.app.listen(port, () => console.log("Listen on: " + port));
    }

}
