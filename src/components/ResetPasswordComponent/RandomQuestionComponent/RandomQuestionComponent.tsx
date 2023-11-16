// import { Suspense } from "react";
import RandomQuestionStyle from "./RandomQuestion.module.scss";

function RandomQuestionComponent(props: any) {
  return (
    // <Suspense
    <div className={RandomQuestionStyle.questionContainer}>
      <label htmlFor="answer">Question</label>
      <h3>{props.question}</h3>
    </div>
  );
}
export default RandomQuestionComponent;
