import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({ submit, nextQuestion, prevQuestion, progress }) {
  return (
    <div className={classes.progressBar}>
      <div onClick={prevQuestion} className={classes.backButton}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip}>{progress}% Cimplete!</div>
        <div className={classes.rangeBody}>
          <div className={classes.progress} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <Button onClick={progress===100?submit:nextQuestion} className={classes.next}>
        <span>{progress===100?"Submit":"Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}