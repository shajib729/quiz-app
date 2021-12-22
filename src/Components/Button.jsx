import classes from "../styles/Button.module.css";

export default function Button({ className,children, ...props }) {
  return (
    <button {...props} className={`${className} ${classes.button}`}>
      {children}
    </button>
  );
}