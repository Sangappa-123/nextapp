"use client";
import React, { useEffect, useState } from "react";
import receiptMapperStyle from "./receiptMapperComponent.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading";
import TabsButtonComponent from "../common/TabsButtonComponent";
import GenericBreadcrumb from "../common/GenericBreadcrumb";
import ClaimedItemsComponent from "./ClaimedItemsComponent/ClaimedItemsComponent";

type propTypes = {
  claimId: string;
};
const ReceiptsMapperComponent: React.FC<propTypes> = ({ claimId }: propTypes) => {
  const [claimNumber, setClaimNumber] = useState<string>("");
  useEffect(() => {
    try {
      setClaimNumber(sessionStorage.getItem("claimNumber") ?? "");
    } catch (error) {
      setClaimNumber("");
    }
  }, []);

  const tabData = [
    {
      name: "Claimed Items",
      content: <ClaimedItemsComponent claimNumber={claimNumber} />,
    },
    {
      name: "Summary",
      content: <ClaimedItemsComponent claimNumber={claimNumber} />,
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
        <TabsButtonComponent tabData={tabData} showBorders={true} />
      </div>
    </div>
  );
};

export default ReceiptsMapperComponent;
