import React from "react";
import validationContainerStyle from "./passwordValidationCondition.module.scss";

function PasswordValidationCondition() {
  return (
    <div className={validationContainerStyle.pwdValidationContainer}>
      <p>New Password Requirement</p>
      <ul className={validationContainerStyle.validationList}>
        <li>* 8-16 character long</li>
        <li>* Should contain atleast one number and one special character</li>
        <li>* Should have a mixture of uppercase and lowercase letters</li>
      </ul>
    </div>
  );
}

export default PasswordValidationCondition;
