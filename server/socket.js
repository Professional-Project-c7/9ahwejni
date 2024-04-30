const express=require("express")
const app=express()
const { Server } = require('socket.io');
const http = require('http');
const cors =require("cors")
app.use(cors())
const server = http.createServer(app);
const io = new Server(server,
    {
   cors: {
     origin: "http://localhost:4000",
     methods: ["GET", "POST"],
   }, 
 }
 );
 
 
 io.on("connection", (socket) => {
   console.log(`User Connected: ${socket.id}`);
 

 
   socket.on("send_message", (data) => {
     console.log(data)
     socket.broadcast.emit("receive_message", data);
   });
 
   socket.on("disconnect", () => {
     console.log("User Disconnected", socket.id);
   });
 });
 server.listen(4001, function () {
    console.log("Server is running on port", 4001);
  })