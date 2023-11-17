"use client";
import React from "react";
import clsx from "clsx";
import securityFormStyle from "./securityForm.module.scss";
import GenericInput from "@/components/common/GenericInput";
import PasswordValidationCondition from "./PasswordValidationCondition";
import GenericButton from "@/components/common/GenericButton";
import { Output, minLength, object, string } from "valibot";
import useCustomForm from "@/hooks/useCustomForm";
import { getCipherEncryptedText } from "@/utils/helper";
import { changePassword } from "@/services/MyProfileService";
import { useRouter } from "next/navigation";

function SecurityForm() {
  const router = useRouter();
  const schema = object({
    currentPassword: string("Please enter your current password", [
      minLength(1, "Please enter your current password"),
    ]),
    newPassword: string("Confirmpass", [
      minLength(1, "Please enter your new password."),
      minLength(8, "The entered password does not meet the above requirements."),
    ]),
    confirmPass: string("Confirmpass", [
      minLength(1, "Please confirm your new password."),
      minLength(8, "The entered password does not meet the above requirements."),
    ]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useCustomForm(schema);

  const onSubmit = async (data: Output<typeof schema>) => {
    console.log("password::", data);
    let payload;
    const encryptedCurrPass = getCipherEncryptedText(data.currentPassword);
    const encryptedNewPass = getCipherEncryptedText(data.newPassword);
    if (encryptedCurrPass && encryptedNewPass) {
      payload = {
        oldPassword: btoa(encryptedCurrPass),
        newPassword: btoa(encryptedNewPass),
      };
    }
    const changePasswordRes: any = await changePassword(payload);
    console.log("changePasswordRes", changePasswordRes);

    if (changePasswordRes.result.status === 200) {
      if (
        localStorage.getItem("forgotPassword") === "false" &&
        localStorage.getItem("securityQuestionsExists") === "false"
      ) {
        router.replace("/security-question");
      } else {
        router.replace("/adjuster-dashboard");
      }
    }
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
            id="currentPassword"
            type="password"
            placeholder="Current Password"
            errorMsg={errors?.currentPassword?.message}
            showError={errors["currentPassword"]}
            {...register("currentPassword")}
          />
          <PasswordValidationCondition />
          <GenericInput
            formControlClassname={clsx({
              [securityFormStyle.formControl]: true,
            })}
            inputFieldClassname={securityFormStyle.inputFieldClassname}
            label="new password"
            id="newPassword"
            type="password"
            placeholder="New Password"
            errorMsg={errors?.newPassword?.message}
            showError={!errors["currentPassword"] && errors["newPassword"]}
            {...register("newPassword")}
          />
          <GenericInput
            formControlClassname={clsx({
              [securityFormStyle.formControl]: true,
            })}
            inputFieldClassname={securityFormStyle.inputFieldClassname}
            label="Confirm Password"
            id="confirmPass"
            type="password"
            placeholder="Confirm Password"
            errorMsg={errors?.confirmPass?.message}
            showError={
              !errors["currentPassword"] &&
              !errors["newPassword"] &&
              errors["confirmPass"]
            }
            {...register("confirmPass")}
          />
        </div>
      </div>
      <GenericButton
        btnClassname="mt-2 ms-auto w-fit"
        label="Change Password"
        // theme="normal"
        disabled={!isDirty}
        type="submit"
      />
    </form>
  );
}

export default SecurityForm;
