import React from "react";
import GenericBreadcrumb from "@/components/common/GenericBreadcrumb";
// import { fetchClaimItemDetails } from "@/services/AdjusterMyClaimServices/LineItemDetailService";
import lineItemContainerStyle from "./lineItemDetailContainer.module.scss";
// import { redirect } from "next/navigation";
// import PaginationButtons from "../../components/AdjusterLineItemComponent/PaginationButtons";
import AdjusterLineItemComponent from "@/components/AdjusterLineItemComponent";

interface itemDetailPropType {
  itemId: string;
  claimId: string;
}

async function AdjusterLineItemDetailContainer({ itemId, claimId }: itemDetailPropType) {
  console.log(">>>>>>>>>", itemId, claimId);
  // const itemDetail = await fetchClaimItemDetails({ itemId: +itemId });
  // const data = itemDetail.data;
  // if (data.claimId != claimId) redirect("/");
  // const pathList = [
  //   {
  //     name: "Home",
  //     path: "/login",
  //   },
  //   {
  //     name: data.claimNumber,
  //     path: "/",
  //   },
  //   {
  //     name: data.itemNumber,
  //     active: true,
  //     path: "",
  //   },
  // ];
  const pathList = [
    {
      name: "Home",
      path: "/login",
    },
    {
      name: "claimNumber",
      path: "/",
    },
    {
      name: "itemNumber",
      active: true,
      path: "",
    },
  ];
  return (
    <div className={lineItemContainerStyle.container}>
      <GenericBreadcrumb
        dataList={pathList}
        customClassname={lineItemContainerStyle.breadcrumb}
        customNavClassname={lineItemContainerStyle.customNav}
      />
      <AdjusterLineItemComponent />
    </div>
  );
}

export default AdjusterLineItemDetailContainer;
