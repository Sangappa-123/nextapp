"use client";
import React from "react";
import "./loginComponent.modules.scss";
import LoginForm from "./LoginForm";

function LoginComponent() {
  return (
    <div className="loginComponent">
      <h1 className="loginComponent__heading">Insurance company Portal</h1>
      <div className="loginComponent__container">
        <div className="loginComponent__content">
          <img
            className="loginComponent__image"
            alt="company_logo"
            src="http://173.255.198.245:8080/ArtigemRS-FI/artigem/mediafiles/EVLINS/05f9cee6-086a-43de-99ad-9dcf133481b6.png"
          />
        </div>
        <div className="loginComponent__content loginComponent__content--right">
          <h3 className="loginComponent__subHeading">Welcome back!</h3>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
