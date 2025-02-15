const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

io.on("connection", function(socket) {
    console.log("connected");
    socket.on("sendLocation", function(data) {
        io.emit("receiveLocation",{
            id: socket.id,
            ...data,
        });
    });

    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
    });

});     



app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000, function() {
    console.log("Server is running on port 3000");
});