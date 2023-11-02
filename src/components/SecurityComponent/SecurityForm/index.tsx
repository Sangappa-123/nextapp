"use client";
import React from "react";
import clsx from "clsx";
import securityFormStyle from "./securityForm.module.scss";
import GenericInput from "@/components/common/GenericInput";
import PasswordValidationCondition from "./PasswordValidationCondition";
import GenericButton from "@/components/common/GenericButton";

function SecurityForm() {
  return (
    <form
      className={clsx({
        "col-12": true,
        "d-flex": true,
        "flex-column": true,
      })}
    >
      <div
        className={clsx({
          [securityFormStyle.securityFormContainer]: true,
        })}
      >
        <div>Password</div>
        <div className={securityFormStyle.formGroup}>
          <GenericInput
            formControlClassname={clsx({
              [securityFormStyle.formControl]: true,
            })}
            inputFieldClassname={securityFormStyle.inputFieldClassname}
            label="current password"
            id="current_password"
            placeholder="Current Password"
            onBlur={() => {
              console.log("hhkjhjkhkj");
            }}
          />
          <PasswordValidationCondition />
          <GenericInput
            formControlClassname={clsx({
              [securityFormStyle.formControl]: true,
            })}
            inputFieldClassname={securityFormStyle.inputFieldClassname}
            label="new password"
            id="new_password"
            placeholder="New Password"
          />
          <GenericInput
            formControlClassname={clsx({
              [securityFormStyle.formControl]: true,
            })}
            inputFieldClassname={securityFormStyle.inputFieldClassname}
            label="Confirm Password"
            id="confirm_password"
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <GenericButton
        btnClassname="mt-2"
        label="Reset Password"
        theme="normal"
        type="submit"
      />
    </form>
  );
}

export default SecurityForm;
