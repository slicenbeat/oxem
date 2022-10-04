import React from "react";
import "./Button.sass";
const Button = ({flagBlock, onClick}) => {
  return <button disabled={flagBlock} className={flagBlock? 'button_loading':'button_work'} onClick={onClick}>
    {flagBlock? ``: `Оставить заявку`}
    </button>;
};
export default Button;
