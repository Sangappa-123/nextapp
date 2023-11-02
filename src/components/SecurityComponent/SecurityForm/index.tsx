"use client";
import React from "react";
import clsx from "clsx";
import securityFormStyle from "./securityForm.module.scss";
import GenericInput from "@/components/common/GenericInput";
import PasswordValidationCondition from "./PasswordValidationCondition";
import GenericButton from "@/components/common/GenericButton";
import { Output, ValiError, minLength, object, string } from "valibot";
import useCustomForm from "@/hooks/useCustomForm";

function SecurityForm() {
  const schema = object({
    currentPass: string("Please enter your current password", [
      minLength(1, "Please enter your current password"),
    ]),
    newPass: string("Confirmpass", [
      minLength(1, "Please enter your password."),
      minLength(
        8,
        "The entered password does not meet the above requirements."
      ),
    ]),
    confirmPass: string("Confirmpass", [
      minLength(1, "Please enter your password."),
      minLength(
        8,
        "The entered password does not meet the above requirements."
      ),
    ]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useCustomForm(schema);
  console.log("=========", errors);

  const onSubmit = (data: Output<typeof schema>) => {
    console.log("password::", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
            id="currentPass"
            placeholder="Current Password"
            {...register("currentPass")}
          />
          <PasswordValidationCondition />
          <GenericInput
            formControlClassname={clsx({
              [securityFormStyle.formControl]: true,
            })}
            inputFieldClassname={securityFormStyle.inputFieldClassname}
            label="new password"
            id="newPass"
            placeholder="New Password"
            errorMsg={errors?.newPass?.message}
            showError={errors["newPass"]}
            {...register("newPass")}
          />
          <GenericInput
            formControlClassname={clsx({
              [securityFormStyle.formControl]: true,
            })}
            inputFieldClassname={securityFormStyle.inputFieldClassname}
            label="Confirm Password"
            id="confirmPass"
            placeholder="Confirm Password"
            errorMsg={errors?.confirmPass?.message}
            showError={errors["confirmPass"]}
            {...register("confirmPass")}
          />
        </div>
      </div>
      <GenericButton
        btnClassname="mt-2"
        label="Change Password"
        theme="normal"
        disabled={!isDirty}
        type="submit"
      />
    </form>
  );
}

export default SecurityForm;
