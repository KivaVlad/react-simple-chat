import {memo} from "react";
import MessageSender from "../message-sender";
import MessageRecipient from "../message-recipient";
import s from "./style.module.css";

function ChatBoard(props) {
  const {user, messages, onClick, onRemove} = props;

  return (
    <div className={s.chat}>
      <div className={s.header}>
        <button type="button" className={s.button} onClick={onClick}>Покинуть чат</button>
      </div>
      
      <div className={s.container}>
        {messages.map(item => (
          item.sender.id === user.id 
            ? <MessageSender key={item.id} item={item} onRemove={onRemove}/>
            : <MessageRecipient key={item.id} item={item} onRemove={onRemove}/>
        ))}
      </div>
      
    </div>
  )
}

export default memo(ChatBoard);