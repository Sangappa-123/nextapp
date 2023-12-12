import React from "react";
import replacementItemSectionStyle from "./replacementItemSection.module.scss";
import GenericButton from "@/components/common/GenericButton";
import NoRecordComponent from "@/components/common/NoRecordComponent/NoRecordComponent";

function ReplacementItemSection() {
  return (
    <div className={replacementItemSectionStyle.root}>
      <div className={replacementItemSectionStyle.heading}>
        <span>Replacement Item</span>
        <GenericButton label="Build a custom comparable" size="small" />
      </div>
      <div className={replacementItemSectionStyle.content}>
        <div className="m-auto">
          <NoRecordComponent message="Scroll down to find comparable" />
        </div>
      </div>
    </div>
  );
}

export default ReplacementItemSection;
