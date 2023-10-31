"use client";
import React from "react";
import Link from "next/link";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, minLength, email } from "valibot";
import { useForm } from "react-hook-form";
import GenericInput from "@/components/common/GenericInput";
import GenericButton from "@/components/common/GenericButton";
import "./loginForm.modules.scss";

type formValueType = {
  username: string;
  password: string;
};

function LoginForm() {
  const schema = object({
    username: string("Your email must be a string.", [
      minLength(1, "Please enter your email."),
      email("The email address is badly formatted."),
    ]),
    password: string("Your password must be a string.", [
      minLength(1, "Please enter your password."),
      minLength(8, "Your password must have 8 characters or more."),
    ]),
  });

  const form = useForm<formValueType>({
    resolver: valibotResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = (data: formValueType) => {
    console.log("OnSubmit::", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="loginForm__form">
        <GenericInput
          showError={errors["username"]}
          errorMsg={errors?.username?.message}
          placeholder="Username or Agencycode"
          id="username"
          {...register("username")}
        />
        <GenericInput
          showError={errors["password"]}
          errorMsg={errors?.password?.message}
          placeholder="Password"
          id="password"
          {...register("password")}
        />
        <GenericButton label="Login" type="submit" />
        <Link href="/">Forgot Password</Link>

        <GenericButton
          label="Sign in with SSO"
          theme="darkBlue"
          onClickHandler={(e) => console.log(e)}
        />
      </form>
    </>
  );
}

export default LoginForm;
