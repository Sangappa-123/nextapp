import React from "react";
import webComparablesStyle from "./webComparables.module.scss";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import PriceLimitComparable from "./PriceLimitComparable";
import ComparableSearchBox from "./ComparableSearchBox";
import LoadingSkelton from "./LoadingSkelton";

function WebComparables() {
  return (
    <div className={webComparablesStyle.root}>
      <div className={webComparablesStyle.searchContainer}>
        <GenericComponentHeading title="Web Comparable(s)" />
        <div className={webComparablesStyle.searchWraper}>
          <ComparableSearchBox />
          <PriceLimitComparable />
        </div>
      </div>
      <div className={webComparablesStyle.itemListContainer}>
        <LoadingSkelton />
        <LoadingSkelton />
        <LoadingSkelton />
        <LoadingSkelton />
        <LoadingSkelton />
      </div>
    </div>
  );
}

export default WebComparables;
