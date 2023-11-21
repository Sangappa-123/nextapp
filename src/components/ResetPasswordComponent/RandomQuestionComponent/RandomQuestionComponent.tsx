// import { Suspense } from "react";
import RandomQuestionStyle from "./RandomQuestion.module.scss";

function RandomQuestionComponent(props: any) {
  return (
    // <Suspense
    <div className={RandomQuestionStyle.questionContainer}>
      <label htmlFor="question">{props.label}</label>
      <h4>{props.question}</h4>
    </div>
  );
}
export default RandomQuestionComponent;
