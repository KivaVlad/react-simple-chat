import {memo} from "react";
import s from "./style.module.css";

function MessageForm(props) {
  const {value, setValue, onSubmit} = props;

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() && localStorage.getItem('user')) {
      onSubmit();
      setValue('');
    }
  }

  return (
    <form className={s.form_wrapper} onSubmit={handleSubmit}>
      <input 
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Отправить</button>
    </form>
  )
}

export default memo(MessageForm);