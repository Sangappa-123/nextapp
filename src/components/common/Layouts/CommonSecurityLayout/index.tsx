import React from "react";
import NavBarMenu from "../../NavBarMenu";
import securityLayoutStyle from "./commonSecurityLayout.module.scss";

export default function CommonSecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={securityLayoutStyle.root}>
      <div className={securityLayoutStyle.container}>
        <div>
          <NavBarMenu />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
