import React from "react";

import LoginComponent from "@/components/LoginComponent";
import Footer from "@/components/common/Footer";
import "./loginContainer.modules.scss";

function LoginContainer() {
  return (
    <div className="loginContainer">
      <div className="loginContainer__bgImg" />
      <div className="loginContainer__main container">
        <div className="loginContainer__content col-md-6 col-sm-12 col-xs-12">
          <LoginComponent />
        </div>
      </div>
      <div className="loginContainer__footer">
        <Footer />
      </div>
    </div>
  );
}

export default LoginContainer;
