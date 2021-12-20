import classes from "../styles/Form.module.css";

export default function Form({ children, className, ...props }) {
  return (
    <form className={`${className} ${classes.form}`} action="#" {...props}>
      {children}
    </form>
  );
}