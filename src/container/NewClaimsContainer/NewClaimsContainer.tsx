import React from "react";
import NewClaimsStyle from "./newClaimsStyle.module.scss";
import GenericBreadcrumb from "@/components/common/GenericBreadcrumb/index";
import NewclaimsComponent from "@/components/NewclaimsComponent/index";

const pathList = [
  {
    name: "Home",
    path: "/login",
  },
  {
    name: "All Claim",
    path: "/login",
    active: true,
  },
];

function NewclaimsContainer() {
  return (
    <div className={NewClaimsStyle.container}>
      <GenericBreadcrumb dataList={pathList} />
      <p className={NewClaimsStyle.Wizard}>New Claim Wizard</p>
      <hr className={NewClaimsStyle.divider} />
      <div className="container-fluid p-0 pt-2">
        <div className="row m-0">
          {/* <SecurityQuestionComponent /> */}
          <NewclaimsComponent />
        </div>
      </div>
    </div>
  );
}

export default NewclaimsContainer;
