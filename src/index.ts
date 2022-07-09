import bootServer from "./server/http";
import bootConnection from "./boot/db";

(async () => {
    await bootConnection();
    bootServer();
})();
