import factory from "./boot/container";
import HttpServer from "./server/http";

(async () => {
    let container = await factory();
    let server = new HttpServer(container);
    server.listen(3000);
})();
