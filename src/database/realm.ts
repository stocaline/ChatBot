import Realm from "realm";
import { ChatSchema, MessageSchema, UserSchema } from "./schemas/ChatSchema"

export const getRealm = async () => await Realm.open({
    path: "chatbot-app",
    schema: [ChatSchema, MessageSchema, UserSchema],
    schemaVersion: 4,
})