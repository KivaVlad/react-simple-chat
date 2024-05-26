import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function ChatLayout({navbar, board, message}) {
  const cn = bem('ChatLayout');

  return (
    <div className={cn()}>
      <div className={cn('navbar')}>
        {navbar}
      </div>
      <div className={cn('main')}>
        <div className={cn('board')}>
          {board}
        </div>
        <div className={cn('message')}>
          {message}
        </div>
      </div>
    </div>
  )
}

export default memo(ChatLayout);