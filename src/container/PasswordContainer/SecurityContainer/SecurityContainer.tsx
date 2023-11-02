import React from "react";
import GenericBreadcrumb from "@/components/common/GenericBreadcrumb";
import securityContainerStyle from "./securityContainer.module.scss";
import SecurityComponent from "@/components/SecurityComponent";

const pathList = [
  {
    name: "Home",
    path: "/login",
  },
  {
    name: "Support",
    active: true,
    path: "",
  },
];

function SecurityContainer() {
  return (
    <div className={securityContainerStyle.securityContainer}>
      <GenericBreadcrumb dataList={pathList} />
      <h4 className={securityContainerStyle.subHeading}>Security</h4>
      <hr className={securityContainerStyle.divider} />
      <div className="container-fluid p-0 pt-3">
        <div className="row m-0">
          <SecurityComponent />
        </div>
      </div>
    </div>
  );
}

export default SecurityContainer;
