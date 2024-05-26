import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function PageLayout({children}) {

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

export default memo(PageLayout);