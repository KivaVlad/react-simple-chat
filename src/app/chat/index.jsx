import {memo, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {socket} from "../../socket";
import {genUUID} from "../../utils";
import PageLayout from "../../components/page-layout";
import ChatLayout from "../../components/chat-layout";
import Navbar from "../../components/navbar";
import ChatBoard from "../../components/chat-board";
import MessageForm from "../../components/message-form";

function Chat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const storageUser = JSON.parse(localStorage.getItem('user'));
  const currentUser = users.find((item) => item.id === storageUser.id);

  const callbacks = {
    // Создание нового сообщения
    onCreate: useCallback(() => {
      socket.emit('create', {
        id: genUUID(),
        text: message,
        name: currentUser.name,
        socketID: socket.id,
      })
    }, [socket, message]),
    // Удаление выбранного сообщения
    onRemove: useCallback((item) => {
      socket.emit('remove', item)
    }, []),
    // Выход из чата
    onAlive: useCallback(() => {
      socket.emit('logout', currentUser);
      localStorage.removeItem('user');
      navigate('/');
    }, [socket, currentUser]),
  }

  useEffect(() => {
    socket.on('messages', (data) =>  setMessages(data));
    socket.on('users', (data) => setUsers(data));
  }, [socket, messages])

  return (
    <PageLayout>
      <ChatLayout 
        navbar={<Navbar users={users}/>}
        board={<ChatBoard user={currentUser} messages={messages} onClick={callbacks.onAlive} onRemove={callbacks.onRemove}/>}
        form={<MessageForm value={message} setValue={setMessage} onSubmit={callbacks.onCreate}/>}
      />
    </PageLayout>
  )
}

export default memo(Chat);