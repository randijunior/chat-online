import { Container}  from "inversify";
import ChatService from "../domain/service/chat";

let container = new Container();

container.bind<ChatService>(ChatService).to(ChatService).inSingletonScope();
