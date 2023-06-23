export const MessageSchema  = {
    name: "Message",
    properties: {
        _id: "string",
        from: "int",
        to: "int",
        path: "string",
        message: "string",
        created_at: "string"
    },
    
    primaryKey: "_id",
}

export const ChatSchema = {
    name: "Chat",
    properties: {
        _id: "string",
        title: "string",
        messages: { type: "list", objectType: "Message" },
        created_at: "string",
    },
    
    primaryKey: "_id",
}

