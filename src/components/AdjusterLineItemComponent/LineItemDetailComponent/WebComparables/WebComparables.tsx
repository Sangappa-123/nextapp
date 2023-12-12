import React from "react";
import webComparablesStyle from "./webComparables.module.scss";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import PriceLimitComparable from "./PriceLimitComparable";
import ComparableSearchBox from "./ComparableSearchBox";

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
    </div>
  );
}

export default WebComparables;
