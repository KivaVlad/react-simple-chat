import {memo, useState, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {socket} from "../../socket";
import {genUUID} from "../../utils";
import PageLayout from "../../components/page-layout";
import LoginForm from "../../components/login-form";

function Auth() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  const callbacks = {
    // Авторизация нового пользователя
    onLogin: useCallback(() => {
      const newUser = {id: genUUID(), name: user};
      socket.emit('login', newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/chat');
    }, [user]),
  }

  return (
    <PageLayout>
      <LoginForm value={user} onChange={setUser} onSubmit={callbacks.onLogin}/>
    </PageLayout>
  )
}

export default memo(Auth);