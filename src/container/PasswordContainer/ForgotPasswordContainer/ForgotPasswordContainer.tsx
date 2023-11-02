import React from "react";
import Image from "next/image";

import fPWDStyle from "./forgotPasswordContainer.module.scss";
import ForgotPasswordComponent from "@/components/ForgotPasswordComponent";

function ForgotPasswordContainer() {
  return (
    <div className={fPWDStyle.forgotPwdContainer}>
      <div className={fPWDStyle.logoDiv}>
        <div className={fPWDStyle.logo}>
          <Image
            alt="company_logo"
            fill
            objectFit="cover"
            src="http://173.255.198.245:8080/ArtigemRS-FI/artigem/mediafiles/EVLINS/05f9cee6-086a-43de-99ad-9dcf133481b6.png"
          />
        </div>
      </div>
      <div className={fPWDStyle.forgotPwdContainer}>
        <ForgotPasswordComponent />
      </div>
    </div>
  );
}

export default ForgotPasswordContainer;
