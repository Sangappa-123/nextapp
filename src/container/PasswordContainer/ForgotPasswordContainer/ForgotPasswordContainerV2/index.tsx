import React from "react";
import Image from "next/image";

import fPWDStyle from "./forgotPasswordContainerV2.module.scss";
import ForgotPasswordComponent from "@/components/ForgotPasswordComponent";
import { GetComponyLogo } from "@/services/LoginService";
import clsx from "clsx";

async function ForgotPasswordContainerV2() {
  const { data }: any = await GetComponyLogo();

  return (
    <div className={fPWDStyle.root}>
      <div className={clsx(fPWDStyle.heading, fPWDStyle.heading2)}>
        Evolution Insurance Company
      </div>
      <div className={fPWDStyle.content}>
        <div className={fPWDStyle.logo}>
          {data?.logo && (
            <Image
              alt="company_logo"
              fill
              src={data?.logo}
              style={{ objectFit: "contain" }}
              sizes="100%"
            />
          )}
        </div>
        <div className={fPWDStyle.forgotPwdContainer}>
          <ForgotPasswordComponent />
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordContainerV2;
