import React from "react";
import addedComparablesStyle from "./addedComparables.module.scss";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import NoRecordComponent from "@/components/common/NoRecordComponent/NoRecordComponent";

function AddedComparables() {
  return (
    <div className={addedComparablesStyle.root}>
      <div className={addedComparablesStyle.heading}>
        <GenericComponentHeading title="Added Comparable" />
      </div>
      <div className={addedComparablesStyle.content}>
        <div className="m-auto">
          <NoRecordComponent message="No comparable added yet" />
        </div>
      </div>
    </div>
  );
}

export default AddedComparables;
