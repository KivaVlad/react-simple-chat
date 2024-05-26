import {memo} from "react";
import s from "./style.module.css";

function Navbar({users}) {

  return (
    <div className={s.navbar}>
      <div className={s.header}>Пользователи</div>
      <div className={s.users}>
        {users.map(item => (
          <div className={s.user} key={item.id}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Navbar);