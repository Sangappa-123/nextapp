import React from "react";
import GenericBreadcrumb from "@/components/common/GenericBreadcrumb";
import ResetPasswordStyle from "./ResetPasswordContainer.module.scss";
import ResetPasswordComponent from "@/components/ResetPasswordComponent";

const pathList = [
  {
    name: "Home",
    path: "/login",
  },
  {
    name: "Security",
    active: true,
    path: "",
  },
];

function ResetPasswordContainer() {
  return (
    <div className={ResetPasswordStyle.resetPasswordContainer}>
      <GenericBreadcrumb dataList={pathList} />
      <h4 className={ResetPasswordStyle.subHeading}>Security Questions</h4>
      <hr className={ResetPasswordStyle.divider} />
      <div className="container-fluid p-0 pt-3">
        <div className="row m-0">
          <ResetPasswordComponent />
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordContainer;
