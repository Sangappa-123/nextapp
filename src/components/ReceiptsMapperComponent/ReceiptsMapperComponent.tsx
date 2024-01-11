"use client";
import React from "react";
import receiptMapperStyle from "./receiptMapperComponent.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading";
import TabsButtonComponent from "../common/TabsButtonComponent";
import { useParams } from "next/navigation";
import GenericBreadcrumb from "../common/GenericBreadcrumb";
import ClaimedItemsComponent from "./ClaimedItemsComponent/ClaimedItemsComponent";

const ReceiptsMapperComponent: React.FC = () => {
  const { claimId } = useParams();

  let claimNumber: string;
  try {
    claimNumber = sessionStorage.getItem("claimNumber") ?? "";
  } catch (error) {
    claimNumber = "";
  }
  const tabData = [
    {
      name: "Claimed Items",
      content: <ClaimedItemsComponent claimNumber={claimNumber} />,
    },
    {
      name: "Summary",
    },
  ];
  const pathList = [
    {
      name: "Home",
      path: "/adjuster-dashboard",
    },
    {
      name: claimNumber,
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

export default ReceiptsMapperComponent;
