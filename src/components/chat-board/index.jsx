import {memo} from "react";
import s from "./style.module.css";

function ChatBoard({messages, onClick}) {
  return (
    <div className={s.chat}>
      <div className={s.header}>
        <button type="button" className={s.button} onClick={onClick}>Покинуть чат</button>
      </div>
      
      <div className={s.container}>
        {messages.map(elem => (
          elem.name === localStorage.getItem('user') ? (
            <div key={elem.id} className={s.chats}>
              <p className={s.sender_name}>Вы:</p>
              <div className={s.message_sender}>
                <p>{elem.text}</p>
              </div>
            </div>
          ) : (
            <div key={elem.id} className={s.chats}>
              <p>{elem.name}</p>
              <div className={s.message_recipient}>
                <p>{elem.text}</p>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default memo(ChatBoard);