// Creating a websocket server
import { WebSocketServer , WebSocket } from "ws";
const wss = new WebSocketServer({port : 8080}); 
let allSockets:WebSocket[] = [];

let userCount = 0;
// socket is used for all the communication with the client 
wss.on("connection" , (socket) => {
    allSockets.push(socket);
    userCount = userCount + 1 ;
    console.log("User Connected #" + userCount)

    // Handler for received messages from the client 
    socket.on("message" , (message) => {
        console.log("message received " + message.toString())
        // Whatever message , we are receiving from the client , we are sending them back the message as it is.

        // Broadcast the message to all clients / sockets 
        for(let i=0; i < allSockets.length; i++)
        {
            const s = allSockets[i];
            s.send(message.toString() + ": sent from the server")
        }
        
    })
})