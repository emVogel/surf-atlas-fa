import "./Button.scss";

type ButtonSize = "small" | "normal";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  isPrimary?: boolean;
  size?: ButtonSize;
}

function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.disabled}
      className={`${props.isPrimary ? "primary" : ""} button ${
        props.size ? "small" : ""
      }`}
    >
      {props.label}
    </button>
  );
}

export default Button;
