"use client";

import LoginComponent from "@/components/LoginComponent";
import Footer from "@/components/common/Footer";
import "./loginContainer.modules.scss";
// import { GetVersionNumberData } from "@/services/LoginService";
type propType = {
  appVersion: any;
};

function LoginContainer({ appVersion: { buildVersion = "" } }: propType) {
  // const versionNumber = GetVersionNumberData();
  return (
    <div className="loginContainer">
      <div className="loginContainer__bgImg" />
      <div className="loginContainer__main container">
        <div className="loginContainer__content col-md-6 col-sm-12 col-xs-12">
          <LoginComponent />
        </div>
      </div>
      <div className="loginContainer__footer">
        <Footer buildVersion={buildVersion} />
      </div>
    </div>
  );
}

export default LoginContainer;
