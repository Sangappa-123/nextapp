import React from "react";
import securityQuestionPointsStyle from "./securityQuestionPoints.module.scss";

function SecurityQuestionPoints() {
  return (
    <div
      className={securityQuestionPointsStyle.securityQuestionPointsContainer}
    >
      <ul className={securityQuestionPointsStyle.validationList}>
        <li>* Select 3 security questions from the list and answer them.</li>
        <li>
          * These questions and answers will be needed when resetting you
          password.
        </li>
        <li>* Fields are marked with * symbol are mandatory.</li>
      </ul>
    </div>
  );
}

export default SecurityQuestionPoints;
