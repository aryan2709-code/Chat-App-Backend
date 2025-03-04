// Creating a websocket server
import { WebSocketServer , WebSocket } from "ws";
const wss = new WebSocketServer({port : 8080}); 

interface User {
    socket : WebSocket;
    room : string;
}

let allSockets : User[]  = [];


// socket is used for all the communication with the client 
wss.on("connection" , (socket) => {
    console.log("User Connected #")

    // Handler for received messages from the client 
    // The user will no longer receive just simple strings , 
    // they will send something like this :
    // if they want to join a room , the message object will look like this 
    // {
    //     "type" : "join",
    //     "payload" : {
    //         "roomId" : "123"
    //     }
    // }

    // And if they want to send a message 
    // {
    //     "type" : "chat",
    //      "payload" : {
    //         "message" : "hi there"
    //      }
    // }
    socket.on("message" , (message) => {  
        // Websockets don't have a concept of routes and methods , you need to inspect the message , whether it is for "chat" or "join"
        // message received will be  a string 
        // Something like this :
        // let obj = {
        // "name" : "harkirat" 
        // }
        // let str = "{'name' : 'harkirat'}"
        // We will convert this received string to an object
        const parsedMessage = JSON.parse(message as unknown as string)
        if(parsedMessage.type === "join")
        {
            allSockets.push({
                socket,
                room : parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type == "chat")
        {
            const currentUserRoom = allSockets.find((x) => (x.socket == socket))?.room;
            // the above line helps us identify the room of the the client who has just send the message , now we can send this message to all the clients who are 
            // in the same room
            for(let i=0; i<allSockets.length; i++)
            {
                if(allSockets[i].room == currentUserRoom)
                {
                    allSockets[i].socket.send(JSON.stringify(parsedMessage.payload.message))
                }
            }
        }
      
    })
    socket.on("disconnect" , () => {
        
    })
})