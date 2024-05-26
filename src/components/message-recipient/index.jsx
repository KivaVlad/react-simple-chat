import {memo} from "react";
import removeIcon from "../../assets/remove-icon.svg";
import s from "./style.module.css";

function MessageRecipient({item, onRemove}) {
  const callbacks = {
    remove: () => onRemove(item)
  }

  return (
    <div key={item.id} className={s.chats}>
      <p>{item.name}</p>
      <div className={s.message_recipient}>
        <p>{item.text}</p>
        <button onClick={callbacks.remove}>
          <img src={removeIcon} alt=""/>
        </button>
      </div>
    </div>
  )
}

export default memo(MessageRecipient);