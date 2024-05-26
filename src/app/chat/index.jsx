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

  const callbacks = {
    onSubmit: useCallback(() => {
      socket.emit('message', {
        id: genUUID(),
        text: message,
        name: localStorage.getItem('user'),
        socketID: socket.id,
      })
    }, [socket, message]),
    onAlive: useCallback(() => {
      const user = JSON.parse(localStorage.getItem('newUser'));
      socket.emit('logout', user);
      localStorage.removeItem('user');
      localStorage.removeItem('newUser');
      navigate('/');
    }, [socket]),
  }

  useEffect(() => {
    socket.on('response', (data) => setMessages([...messages, data]));
    socket.on('users', (data) => setUsers(data));
  }, [socket, messages])

  return (
    <PageLayout>
      <ChatLayout 
        navbar={<Navbar users={users}/>}
        board={<ChatBoard messages={messages} onClick={callbacks.onAlive}/>}
        message={<MessageForm value={message} setValue={setMessage} onSubmit={callbacks.onSubmit} />}
      />
    </PageLayout>
  )
}

export default memo(Chat);