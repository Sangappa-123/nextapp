"use client";
import React from "react";
import Link from "next/link";
import { object, string, minLength, email, Output } from "valibot";
import useCustomForm from "@/hooks/useCustomForm";
import GenericInput from "@/components/common/GenericInput";
import GenericButton from "@/components/common/GenericButton";
import loginFormStyle from "./loginForm.module.scss";
import { login } from "@/services/LoginService";
import { getCipherEncryptedText } from "@/utils/helper";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
import { useRouter } from "next/navigation";
import { addSessionData, updateLoadingState } from "@/reducers/Session/SessionSlice";

function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
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

  const onSubmit = async (data: Output<typeof schema>) => {
    console.log("OnSubmit::", data);
    let payload;
    const username = getCipherEncryptedText(data.username);
    const password = getCipherEncryptedText(data.password);
    if(username && password) {
      payload = {
        captchCode : "",
        isHideCaptcha : process.env.NEXT_PUBLIC_HIDE_CAPTCHA?.toString(),
        username : window.btoa(username),
        password : window.btoa(password),
     }
    }
   const loginRes: any = await login(payload);
    dispatch(addSessionData(localStorage));
    if(loginRes.result.status === 200001) {
      router.replace("/adjuster-dashboard");
    }
  }

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