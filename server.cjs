const express = require('express');

const app = express();
const PORT = 8000;

const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:5173'
  }
})
const users = [];

app.get('/api', (request, response) => {
  response.json({users})
})

// Поключение Websocket
socketIO.on('connection', (socket) => {
  console.log(`${socket.id} User connected`);

  // Создание нового сообщения
  socket.on('message', (data) => {
    socketIO.emit('response', data);
  })

  // Авторизация нового пользователя
  socket.on('login', (data) => {
    users.push(data);
    socketIO.emit('users', users);
  })

  // Удаление пользователя
  socket.on('logout', (data) => {
    const filteredUsers = users.filter(user => user.id !== data.id);

    if (filteredUsers.length < users.length) {
      users.length = 0;
      filteredUsers.forEach(user => users.push(user));
    }

    socketIO.emit('users', users);
  })

  // Отключение Websocket
  socket.on('disconnect', () => {
    console.log(`${socket.id} User disconnect`);
  })
})

http.listen(PORT, (error) => {
  if (error) {
    throw Error(error);
  }
  console.log('Сервер запущен');
})