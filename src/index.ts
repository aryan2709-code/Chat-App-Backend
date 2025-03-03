// Creating a websocket server
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port : 8080}); 
// Above two lines create a new server

let userCount = 0;
// socket is used for all the communication with the client 
wss.on("connection" , (socket) => {
    userCount = userCount + 1 ;
    console.log("User Connected #" + userCount)

    // Handler for received messages from the client 
    socket.on("message" , (message) => {
        console.log("message received " + message.toString())
        // Whatever message , we are receiving from the client , we are sending them back the message as it is.
        socket.send(message.toString() + ": sent from the server")
    })
})