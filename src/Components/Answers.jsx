import classes from "../styles/Answer.module.css";
import Checkbox from "./Checkbox";

export default function Answers({handleAnswerChange,options}) {
  return (
    <div className={classes.answers}>
      {
        options?.map((option,i) => (
          <Checkbox onChange={(e)=>handleAnswerChange(e, i)} checked={option?.checked} value={i} key={i} className={classes.answer} text={option?.title} />
        ))
      }
    </div>
  );
}