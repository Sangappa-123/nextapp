"use client";
import React, { useEffect, useRef } from "react";
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
import clsx from "clsx";
import { fetchClaimContentAction } from "@/reducers/ClaimData/ClaimContentSlice";

const AdjusterLineItemComponent: React.FC<connectorType> = (props) => {
  const {
    isLoading,
    lineItem,
    resetLineItemDetail,
    claimData = [],
    fetchLineItemDetail,
    fetchClaimContentAction,
  } = props;
  const { itemId, claimId } = useParams();
  console.log("=============", claimId, claimData);
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

  const isInit = useRef(false);

  useEffect(() => {
    if (!isInit.current) {
      fetchLineItemDetail({ itemId: +itemId });
      fetchClaimContentAction({ claimId: claimId.toString() });
      isInit.current = true;
    }

    return () => {
      resetLineItemDetail();
    };
  }, [isInit, fetchLineItemDetail, resetLineItemDetail, itemId, claimId]);

  if (isLoading && claimData.length > 0) {
    return <Loading />;
  }

  return (
    <div className={lineItemComponentStyle.root}>
      <GenericBreadcrumb
        dataList={pathList}
        customClassname={lineItemComponentStyle.breadcrumb}
        customNavClassname={lineItemComponentStyle.customNav}
      />
      {claimData.length > 0 && (
        <PaginationButtons
          pageNumber={+lineItem?.itemNumber}
          totalPages={claimData.length > 0 ? claimData.length : 1}
        />
      )}
      <GenericComponentHeading
        customTitleClassname={lineItemComponentStyle.headingTitle}
        title="Item# 6 - Smith, Gracie"
        customHeadingClassname={clsx(lineItemComponentStyle.heading, {
          [lineItemComponentStyle.noPageHeading]: claimData.length === 0,
        })}
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
  claimData: state.claimContentdata?.claimContentListData,
});

const mapDispatchToProps = {
  fetchLineItemDetail,
  resetLineItemDetail,
  fetchClaimContentAction,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(AdjusterLineItemComponent);
