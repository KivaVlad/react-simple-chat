import {memo} from "react";
import s from "./style.module.css";

function Navbar({currentUser, users}) {
  return (
    <div className={s.navbar}>
      <div className={s.header}>Пользователи</div>
      <div className={s.users}>
        {users.map(item => (
          <div 
            key={item.id}
            className={currentUser.id === item.id ? s.current_user : s.user} 
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Navbar);