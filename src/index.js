import {app} from "./app.js"
import { Server } from "socket.io"

const serverToSocket = app.listen(app.get("port"), ()=>{
    console.log(`Running server on port ${app.get("port")}`)
});

//websocket
const io = new Server(serverToSocket)

io.on("connection", (socket) =>{
    socket.on("chat:Message", (message) =>{
        io.sockets.emit("chat:Message",message)
    })
    socket.on("chat:typing", (data)=>{
        socket.broadcast.emit("chat:typing", data)
    })
})
