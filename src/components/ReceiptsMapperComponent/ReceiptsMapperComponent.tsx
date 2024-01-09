"use client";
import React, { useEffect, useRef } from "react";
import receiptMapperStyle from "./receiptMapperComponent.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading";
import TabsButtonComponent from "../common/TabsButtonComponent";
import { useParams } from "next/navigation";
import GenericBreadcrumb from "../common/GenericBreadcrumb";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";

import clsx from "clsx";

const ReceiptsMapperComponent: React.FC<connectorType> = (props) => {
 
  const {  claimId } = useParams();
 
  const tabData = [
    {
      name: "Claimed Items",
      // content: <LineItemDetailComponent rapidDivRef={ref} />,
    },
    {
      name: "Summary",
      // content: <LineItemDetailComponent rapidDivRef={ref} />,
    },
  ];
  const pathList = [
    {
      name: "Home",
      path: "/adjuster-dashboard",
    },
    {
      name: "CLAIM NUMBER",
      path: `/adjuster-property-claim-details/${claimId}`,
    },
    {
      name: "Receipt Mapper",
      active: true,
      path: "",
    },
  ];



  return (
    <div className="row">
      <div className={receiptMapperStyle.stickyContainer}>
        <GenericBreadcrumb
          dataList={pathList}
          customClassname={receiptMapperStyle.breadcrumb}
          customNavClassname={receiptMapperStyle.customNav}
        />
       
        <GenericComponentHeading
          customTitleClassname={receiptMapperStyle.headingTitle}
          title="Receipt Mapper"
       
        />
      </div>
      <div>
        <TabsButtonComponent showBorders={true} tabData={tabData} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  
});

const mapDispatchToProps = {
 
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ReceiptsMapperComponent);
