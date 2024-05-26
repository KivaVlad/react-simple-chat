import {memo} from "react";
import removeIcon from "../../assets/remove-icon.svg";
import s from "./style.module.css";

function MessageSender({item, onRemove}) {
  const callbacks = {
    remove: () => onRemove(item)
  }

  return (
    <div className={s.chats}>
      <p className={s.sender_name}>Вы</p>
      <div className={s.message_sender}>
        <p>{item.text}</p>
        <button onClick={callbacks.remove}>
          <img src={removeIcon} alt=""/>
        </button>
      </div>
    </div>
  )
}

export default memo(MessageSender);