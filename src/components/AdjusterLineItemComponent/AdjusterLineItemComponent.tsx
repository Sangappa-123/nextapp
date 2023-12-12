"use client";
import React from "react";
import PaginationButtons from "@/components/AdjusterLineItemComponent/PaginationButtons";
import lineItemComponentStyle from "./adjusterLineItemComponent.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading";
import TabsButtonComponent from "../common/TabsButtonComponent";
import LineItemDetailComponent from "./LineItemDetailComponent";

function AdjusterLineItemComponent() {
  const tabData = [
    {
      name: "Item Details",
      content: <LineItemDetailComponent />,
    },
  ];
  return (
    <div className={lineItemComponentStyle.root}>
      <PaginationButtons />
      <GenericComponentHeading
        customTitleClassname={lineItemComponentStyle.headingTitle}
        title="Item# 6 - Smith, Gracie"
      />
      <div>
        <TabsButtonComponent showBorders={true} tabData={tabData} />
      </div>
    </div>
  );
}

export default AdjusterLineItemComponent;
