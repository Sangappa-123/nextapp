import React from "react";

import LoginComponent from "@/components/LoginComponent";
import Footer from "@/components/common/Footer";
import loginContainerStyle from "./loginContainer.module.scss";
import clsx from "clsx";

function LoginContainer() {
  return (
    <div className={loginContainerStyle.loginContainer}>
      <div className={loginContainerStyle.loginContainer__bgImg} />
      <div
        className={clsx({
          [loginContainerStyle.loginContainer__main]: true,
          container: true,
        })}
      >
        <div
          className={clsx({
            [loginContainerStyle.loginContainer__content]: true,
            "col-md-6": true,
            "col-sm-12": true,
            "col-xs-12": true,
          })}
        >
          <LoginComponent />
        </div>
      </div>
      <div className={loginContainerStyle.loginContainer__footer}>
        <Footer />
      </div>
    </div>
  );
}

export default LoginContainer;
