import React from "react";
import NewClaimsStyle from "./newClaimsStyle.module.scss";
import GenericBreadcrumb from "@/components/common/GenericBreadcrumb/index";
import NewclaimsComponent from "@/components/NewclaimsComponent/index";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";

const pathList = [
  {
    name: "Home",
    path: "/adjuster-dashboard",
  },
  {
    name: "New Claim Wizard",
    path: "",
    active: true,
  },
];

function NewclaimsContainer() {
  return (
    <div className="row">
      <div className={NewClaimsStyle.stickyContainer}>
        <GenericBreadcrumb dataList={pathList} />
        <GenericComponentHeading
          customHeadingClassname={NewClaimsStyle.headingContainer}
          customTitleClassname={NewClaimsStyle.headingTxt}
          title="New Claim Wizard"
        />
      </div>
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
