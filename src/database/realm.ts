import Realm from "realm";
import { ChatSchema, MessageSchema } from "./schemas/ChatSchema"

export const getRealm = async () => await Realm.open({
    path: "chatbot-app",
    schema: [ChatSchema, MessageSchema],
    schemaVersion: 3,
})