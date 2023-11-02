import React from "react";
import fPWDCStyle from "./forgotPasswordComponent.module.scss";
import ForgotPasswordForm from "./ForgotPasswordForm";

function ForgotPasswordComponent() {
  return (
    <div className={fPWDCStyle.main}>
      <div className={fPWDCStyle.heading}>Forgot Password?</div>
      <div className={fPWDCStyle.fogotPasswordContent}>
        <div className={fPWDCStyle.subHeading}>
          Provide your email address and we'll send you link to reset your
          password.
        </div>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPasswordComponent;
