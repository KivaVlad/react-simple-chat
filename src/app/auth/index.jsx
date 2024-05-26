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
    onSubmit: useCallback(() => {
      const newUser = {id: genUUID(), name: user};
      socket.emit('login', newUser);
      localStorage.setItem('user', user);
      localStorage.setItem('newUser', JSON.stringify(newUser));
      navigate('/chat');
    }, [user]),
  }

  return (
    <PageLayout>
      <LoginForm value={user} onChange={setUser} onSubmit={callbacks.onSubmit}/>
    </PageLayout>
  )
}

export default memo(Auth);