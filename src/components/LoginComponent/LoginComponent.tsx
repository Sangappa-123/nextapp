"use client";
import React from "react";
import Image from "next/image";
import LoginForm from "./LoginForm";
import loginComponentStyle from "./loginComponent.module.scss";
import clsx from "clsx";

function LoginComponent() {
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
            src="http://173.255.198.245:8080/ArtigemRS-FI/artigem/mediafiles/EVLINS/05f9cee6-086a-43de-99ad-9dcf133481b6.png"
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
