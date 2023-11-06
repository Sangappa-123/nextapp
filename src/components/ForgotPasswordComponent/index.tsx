import React from "react";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import ForgotPasswordForm from "./ForgotPasswordForm";
import fPWDCStyle from "./forgotPasswordComponent.module.scss";

function ForgotPasswordComponent() {
  return (
    <div className={fPWDCStyle.main}>
      <GenericComponentHeading title="Forgot Password?" />
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
