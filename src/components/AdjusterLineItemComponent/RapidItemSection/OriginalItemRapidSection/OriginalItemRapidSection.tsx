import React from "react";
import GenericSelect from "@/components/common/GenericSelect";
import originalItemRapidSectionStyle from "./originalItemRapidSection.module.scss";
import clsx from "clsx";

function OriginalItemRapidSection() {
  return (
    <div className={originalItemRapidSectionStyle.root}>
      <h5 className={originalItemRapidSectionStyle.heading}>Original Item</h5>
      <div>dsfdtdf</div>
      <div className={originalItemRapidSectionStyle.content}>
        <div className={clsx(originalItemRapidSectionStyle.leftSideDiv)}>
          <label>Age</label>
          <div>4Yrs</div>
          <label>Cost Per Unit</label>
          <div>$0.00</div>
        </div>
        <div className={originalItemRapidSectionStyle.rightSideDiv}>
          <div className={originalItemRapidSectionStyle.selectBox}>
            <label htmlFor="category">Category</label>
            <GenericSelect id="category" />
          </div>
          <div className={originalItemRapidSectionStyle.selectBox}>
            <label htmlFor="category">Sub-Category</label>
            <GenericSelect id="category" />
          </div>
          <div className={originalItemRapidSectionStyle.selectBox}>
            <label htmlFor="category">Condition</label>
            <GenericSelect id="category" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OriginalItemRapidSection;
