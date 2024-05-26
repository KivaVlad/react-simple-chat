import {memo} from "react";
import s from "./style.module.css";

function LoginForm(props) {
  const {value, onChange, onSubmit} = props;

  function handleSubmit(e) {
    e.preventDefault();

    if (value.trim()) {
      onSubmit();
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.input_wrapper}>
        <label>Имя позьзователя</label>
        <input 
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <button className={s.btn} type="submit">Войти</button>
    </form>
  )

}

export default memo(LoginForm);