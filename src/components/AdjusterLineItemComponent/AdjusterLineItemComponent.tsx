"use client";
import React, { useEffect } from "react";
import PaginationButtons from "@/components/AdjusterLineItemComponent/PaginationButtons";
import lineItemComponentStyle from "./adjusterLineItemComponent.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading";
import TabsButtonComponent from "../common/TabsButtonComponent";
import LineItemDetailComponent from "./LineItemDetailComponent";
import { useParams } from "next/navigation";
import Loading from "@/app/[lang]/loading";
import GenericBreadcrumb from "../common/GenericBreadcrumb";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import {
  fetchLineItemDetail,
  resetLineItemDetail,
} from "@/reducers/LineItemDetail/LineItemDetailSlice";

const AdjusterLineItemComponent: React.FC<connectorType> = (props) => {
  const { fetchLineItemDetail, isLoading, lineItem, resetLineItemDetail } = props;
  const { itemId } = useParams();
  const tabData = [
    {
      name: "Item Details",
      content: <LineItemDetailComponent />,
    },
  ];
  const pathList = [
    {
      name: "Home",
      path: "/adjuster-dashboard",
    },
    {
      name: lineItem?.claimNumber,
      path: `/adjuster-property-claim-details/${lineItem?.claimId}`,
    },
    {
      name: lineItem?.itemNumber,
      active: true,
      path: "",
    },
  ];

  useEffect(() => {
    fetchLineItemDetail({ itemId: +itemId });

    return () => {
      resetLineItemDetail();
    };
  }, [itemId, fetchLineItemDetail, resetLineItemDetail]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={lineItemComponentStyle.root}>
      <GenericBreadcrumb
        dataList={pathList}
        customClassname={lineItemComponentStyle.breadcrumb}
        customNavClassname={lineItemComponentStyle.customNav}
      />
      <PaginationButtons pageNumber={+lineItem?.itemNumber} />
      <GenericComponentHeading
        customTitleClassname={lineItemComponentStyle.headingTitle}
        title="Item# 6 - Smith, Gracie"
      />
      <div>
        <TabsButtonComponent showBorders={true} tabData={tabData} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoading: state.lineItemDetail.isLoading,
  lineItem: state.lineItemDetail.lineItem,
});

const mapDispatchToProps = {
  fetchLineItemDetail,
  resetLineItemDetail,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(AdjusterLineItemComponent);
