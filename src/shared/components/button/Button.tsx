import { Children, ReactNode, MouseEventHandler } from "react";
import "./Button.scss";

type ButtonSize = "small" | "large" | "regular";

interface ButtonProps {
  disabled?: boolean;
  onButtonClick: (...args: any[]) => void;
  isPrimary?: boolean;
  size?: ButtonSize;
  children: React.ReactNode;
}

function Button(props: ButtonProps) {
  const handleButtonClick = () => {
    props.onButtonClick();
  };
  return (
    <button
      onClick={handleButtonClick}
      disabled={props.disabled}
      className={`${props.isPrimary ? "primary" : ""} button`}
    >
      {props.children}
    </button>
  );
}

export default Button;
