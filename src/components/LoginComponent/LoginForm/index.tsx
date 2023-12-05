"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { object, string, minLength, email, Output } from "valibot";
import useCustomForm from "@/hooks/useCustomForm";
import GenericInput from "@/components/common/GenericInput";
import GenericButton from "@/components/common/GenericButton";
import loginFormStyle from "./loginForm.module.scss";
import { login } from "@/services/LoginService";
import { getCipherEncryptedText, logoutHandler } from "@/utils/helper";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
import { useRouter } from "next/navigation";
import { addSessionData, resetSessionState } from "@/reducers/Session/SessionSlice";
import { loginTranslateType } from "@/translations/loginTranslate/en";

import { addNotification } from "@/reducers/Notification/NotificationSlice";
import { getClientCookie } from "@/utils/utitlity";

function LoginForm({ translate }: { translate: loginTranslateType }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const accessDenideFlag = getClientCookie("accessDenide");
    if (accessDenideFlag === "true") {
      dispatch(resetSessionState());
      logoutHandler();
      dispatch(
        addNotification({
          message: "Access denide",
          id: "access_denide",
          status: "error",
        })
      );
    }
  }, [dispatch]);

  const schema = object({
    username: string("Your email must be a string.", [
      minLength(1, translate?.inputErrors?.userNameRequired),
      email(translate?.inputErrors?.invalidEmail),
    ]),
    password: string("Your password must be a string.", [
      minLength(1, translate?.inputErrors?.passwordRequired),
    ]),
  });

  const { register, handleSubmit, formState } = useCustomForm(schema);

  const { errors } = formState;

  const onSubmit = async (data: Output<typeof schema>) => {
    console.log("OnSubmit::", data);
    let payload;
    const username = getCipherEncryptedText(data.username);
    const password = getCipherEncryptedText(data.password);
    if (username && password) {
      payload = {
        captchCode: "",
        isHideCaptcha: process.env.NEXT_PUBLIC_HIDE_CAPTCHA?.toString(),
        username: btoa(username),
        password: btoa(password),
      };
    }
    const loginRes: any = await login(payload);
    dispatch(addSessionData(localStorage));
    if (loginRes.result.status === 200001) {
      if (localStorage.getItem("resetPassword") === "true") {
        router.push("/security");
      } else if (
        localStorage.getItem("forgotPassword") === "true" &&
        localStorage.getItem("securityQuestionsExists") == "false"
      ) {
        router.push("/security");
      } else if (
        localStorage.getItem("forgotPassword") === "true" &&
        localStorage.getItem("securityQuestionsExists") === "true"
      ) {
        router.push("/reset-password");
      } else if (
        localStorage.getItem("forgotPassword") === "false" &&
        localStorage.getItem("securityQuestionsExists") === "false" &&
        localStorage.getItem("resetPassword") === "false"
      ) {
        router.push("/security-question");
      } else {
        const homePageRoute: string | null = localStorage.getItem("homeScreen");
        if (homePageRoute) {
          router.push(homePageRoute);
        } else {
          router.push("/login");
        }
      }
    }
  };

  // const payload = {"registrationNumber": sessionStorage.getItem("jewelryVendor")}
  // const payload = {"registrationNumber": "ARTGM"}

  // const vendorDetailsRes = await getVendorDetails(payload);
  //   var data ={
  //     "registrationNumber": sessionStorage.getItem("jewelryVendor")
  // };

  // if (loading) return null;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={loginFormStyle.loginForm__form}>
        <GenericInput
          showError={errors["username"]}
          errorMsg={errors?.username?.message}
          placeholder={translate?.inputFields?.usernamePlaceholder}
          id="username"
          {...register("username")}
        />
        <GenericInput
          showError={!errors["username"] && errors["password"]}
          errorMsg={errors?.password?.message}
          placeholder={translate?.inputFields?.passwordPlaceholder}
          type="password"
          id="password"
          {...register("password")}
        />
        <GenericButton label={translate?.inputFields?.submitBtn} type="submit" />
        <Link className={loginFormStyle.link} href="/forgot-password">
          {translate?.forgotPasswordLink}
        </Link>
        <GenericButton label={translate?.inputFields?.ssoBtn} theme="darkBlue" />
      </form>
    </>
  );
}

export default LoginForm;
