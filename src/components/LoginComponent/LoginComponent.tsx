import React from "react";
import Image from "next/image";
import LoginForm from "./LoginForm";
import loginComponentStyle from "./loginComponent.module.scss";
import clsx from "clsx";
import { GetComponyLogo } from "@/services/LoginService";

async function LoginComponent() {
  const {data}:any = await GetComponyLogo();
  return (
    <div className={loginComponentStyle.loginComponent}>
      <h1 className={loginComponentStyle.loginComponent__heading}>
        Insurance company Portal
      </h1>
      <div className={loginComponentStyle.loginComponent__container}>
        <div className={loginComponentStyle.loginComponent__content}>
          <Image
            className={loginComponentStyle.loginComponent__image}
            alt="company_logo"
            fill
            src={data?.logo}
          />
        </div>
        <div
          className={clsx({
            [loginComponentStyle.loginComponent__content]: true,
            [loginComponentStyle["loginComponent__content--right"]]: true,
          })}
        >
          <h3 className={loginComponentStyle.loginComponent__subHeading}>
            Welcome back!
          </h3>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
