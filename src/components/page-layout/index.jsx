import {memo} from "react";
import s from "./style.module.css";

function PageLayout({children}) {
  return (
    <div className={s.container}>
      <div className={s.content}>
        {children}
      </div>
    </div>
  )
}

export default memo(PageLayout);