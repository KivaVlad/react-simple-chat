const express = require('express');

const app = express();
const PORT = 8000;

const server = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

const users = [];
const messages = [];

app.get('/api', (request, response) => {
  response.json({users, messages})
})

// Поключение Websocket
socketIO.on('connection', (socket) => {
  console.log(`${socket.id} User connected`);

  socketIO.emit('users', users);
  socketIO.emit('messages', messages);

  // Авторизация нового пользователя
  socket.on('login', (data) => {
    users.push(data);
    socketIO.emit('users', users);
    socketIO.emit('messages', messages);
  })

  // Удаление пользователя
  socket.on('logout', (data) => {
    const filteredUsers = users.filter(({id}) => id !== data.id);

    if (filteredUsers.length < users.length) {
      users.length = 0;
      filteredUsers.forEach(item => users.push(item));
    }

    socketIO.emit('users', users);
  })

  // Создание нового сообщения
  socket.on('create', (data) => {
    messages.push(data);
    socketIO.emit('messages', messages);
  })

  // Удаление выбранного сообщения
  socket.on('remove', (data) => {
    const filteredMessages = messages.filter(({id}) => id !== data.id);

    if (filteredMessages.length < messages.length) {
      messages.length = 0;
      filteredMessages.forEach(item => messages.push(item));
    }

    socketIO.emit('messages', messages);
  })

  // disconnect Websocket
  socket.on('disconnect', () => {
    console.log(`${socket.id} User disconnect`);
  })
})

server.listen(PORT, (error) => {
  if (error) {
    throw Error(error);
  }
  console.log('Сервер запущен');
})