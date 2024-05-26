import {memo} from "react";
import s from "./style.module.css";

function ChatLayout({navbar, board, form}) {
  return (
    <div className={s.chat}>
      <div className={s.navbar}>
        {navbar}
      </div>
      <div className={s.main}>
        <div className={s.board}>
          {board}
        </div>
        <div className={s.form}>
          {form}
        </div>
      </div>
    </div>
  )
}

export default memo(ChatLayout);