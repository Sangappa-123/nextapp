import React from "react";
import lineItemDetailComponentStyle from "./lineItemDetailComponent.module.scss";
import GroupedActionButtons from "./GroupedActionButtons";
import OrginalItemForm from "./OrginalItemForm";
import ReplacementItemSection from "./ReplacementItemSection";
import WebComparables from "./WebComparables";

function LineItemDetailComponent() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={lineItemDetailComponentStyle.root}
    >
      <GroupedActionButtons />
      <div className={lineItemDetailComponentStyle.topItemSection}>
        <OrginalItemForm />
        <ReplacementItemSection />
      </div>
      <div className={lineItemDetailComponentStyle.bottomItemSection}>
        <WebComparables />
      </div>
      <div></div>
    </form>
  );
}

export default LineItemDetailComponent;
