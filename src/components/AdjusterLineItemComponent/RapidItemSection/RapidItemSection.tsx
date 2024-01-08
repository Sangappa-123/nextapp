import React from "react";
import rapidItemSectionStyle from "./rapidItemSection.module.scss";
import OriginalItemRapidSection from "./OriginalItemRapidSection";
import ReplacementItemRapidSection from "./ReplacementItemRapidSection";
import { OriginalItemRefType } from "../LineItemDetailComponent/OrginalItemForm/OrginalItemForm";

interface propType {
  originalItemRef: OriginalItemRefType | null;
}
function RapidItemSection(props: propType) {
  return (
    <div className={rapidItemSectionStyle.root}>
      <OriginalItemRapidSection originalItemRef={props.originalItemRef} />
      <ReplacementItemRapidSection />
    </div>
  );
}

export default RapidItemSection;
