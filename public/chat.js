// Make a connection 
var socket = io.connect('http://localhost:3000');

const message = document.getElementById('message');
const button = document.getElementById('button');
const feedback = document.getElementById('feedback');
const output = document.getElementById('output');
const user = document.getElementById('userName')

button.addEventListener('click', () => {
  socket.emit('chat', {
    name: user.value,
    message: message.value
  })
  message.value = '';
});

message.addEventListener('keypress' , () => {
  socket.emit('typing' , {typingUser : `${user.value}: is typing`});
})

socket.on('chatFromServer', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += `<p><strong> ${data.name} :</strong> ${data.message} </p>`;
});
socket.on('typing', (data)=> {
  feedback.innerHTML += `<p>${data.typingUser}</p>`
})

