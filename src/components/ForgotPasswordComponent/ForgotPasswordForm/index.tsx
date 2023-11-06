"use client";
import React from "react";
import Link from "next/link";
import GenericButton from "@/components/common/GenericButton";
import fPWDFormStyle from "./forgotPasswordForm.module.scss";
import GenericInput from "@/components/common/GenericInput";
import useCustomForm from "@/hooks/useCustomForm";
import { Output, email, minLength, object, string } from "valibot";
import { useRouter } from "next/navigation";

function ForgotPasswordForm() {
  const router = useRouter();
  const schema = object({
    email: string("Your email must be a string.", [
      minLength(1, "Email is required."),
      email("Please enter valid email."),
    ]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCustomForm(schema);

  const onSubmit = (data: Output<typeof schema>) => {
    console.log("Data::;", data);
    router.push("/security");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={fPWDFormStyle.root}>
      <GenericInput
        label="Email Address"
        placeholder="Email"
        formControlClassname={fPWDFormStyle.formControl}
        inputFieldClassname={fPWDFormStyle.inputField}
        labelClassname={fPWDFormStyle.label}
        theme="normal"
        showError={errors["email"]}
        errorMsg={errors?.email?.message}
        isFixedError={true}
        {...register("email")}
      />
      <div className={fPWDFormStyle.actionDiv}>
        <Link href="/login" className={fPWDFormStyle.backBtn}>
          Back to Login Page
        </Link>
        <GenericButton
          label="Reset"
          theme="normal"
          type="submit"
          btnClassname={fPWDFormStyle.resetBtn}
        />
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
