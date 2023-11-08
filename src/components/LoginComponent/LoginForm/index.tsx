"use client";
import React from "react";
import Link from "next/link";
import { object, string, minLength, email, Output } from "valibot";
import useCustomForm from "@/hooks/useCustomForm";
import GenericInput from "@/components/common/GenericInput";
import GenericButton from "@/components/common/GenericButton";
import loginFormStyle from "./loginForm.module.scss";

function LoginForm() {
  const schema = object({
    username: string("Your email must be a string.", [
      minLength(1, "User name field is required."),
      email("Please enter valid email."),
    ]),
    password: string("Your password must be a string.", [
      minLength(1, "Password field is required."),
    ]),
  });

  const { register, handleSubmit, formState } = useCustomForm(schema);

  const { errors } = formState;

  const onSubmit = (data: Output<typeof schema>) => {
    console.log("OnSubmit::", data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={loginFormStyle.loginForm__form}
      >
        <GenericInput
          showError={errors["username"]}
          errorMsg={errors?.username?.message}
          placeholder="Username or Agencycode"
          id="username"
          {...register("username")}
        />
        <GenericInput
          showError={!errors["username"] && errors["password"]}
          errorMsg={errors?.password?.message}
          placeholder="Password"
          type="password"
          id="password"
          {...register("password")}
        />
        <GenericButton label="Login" type="submit" />
        <Link className={loginFormStyle.link} href="/forgot-password">
          Forgot Your Password?
        </Link>
        <GenericButton label="Sign in with SSO" theme="darkBlue" />
      </form>
    </>
  );
}

export default LoginForm;
