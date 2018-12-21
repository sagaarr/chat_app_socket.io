const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Static files
app.use(express.static('public'));

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/chat.html')
});



io.on('connection', (socket) => {
  console.log("User connected >>>>>");
  
  socket.on('chat', (data) => {
    io.sockets.emit('chatFromServer' , data);
  });
  socket.on('typing', (data) => {
    io.sockets.emit('typing' , data);
  })

});


http.listen(3000 , () => {
  console.log("Server started at port 3000");
});


