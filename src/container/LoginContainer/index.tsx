import React from "react";
import LoginComponent from "@/components/LoginComponent";
import Footer from "@/components/common/Footer";
import loginContainerStyle from "./loginContainer.module.scss";
import clsx from "clsx";
import { GetComponyBackgroundImage } from "@/services/LoginService";

async function LoginContainer() {
  const { data }: any = await GetComponyBackgroundImage();
  const imageUrl = data?.attachments[0]?.url;
  return (
    <div className={loginContainerStyle.loginContainer}>
      <div
        className={loginContainerStyle.loginContainer__bgImg}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className={clsx(loginContainerStyle.loginContainer__main, "container")}>
        <div
          className={clsx(
            loginContainerStyle.loginContainer__content,
            "col-md-6",
            "col-sm-12",
            "col-12"
          )}
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
