import RandomQuestionStyle from "./RandomQuestion.module.scss";

function RandomQuestionComponent(props: any) {
  return (
    <div className={RandomQuestionStyle.questionContainer}>
      <label htmlFor="question">Question</label>
      <h4>{props.question}</h4>
    </div>
  );
}
export default RandomQuestionComponent;
