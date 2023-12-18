import React from "react";
import GenericButton from "@/components/common/GenericButton";
import groupedActionButtonsStyle from "./groupedActionButtons.module.scss";

function GroupedActionButtons() {
  return (
    <div className={groupedActionButtonsStyle.root}>
      <GenericButton label="Accept Standard Cost" size="medium" theme="normal" />
      <GenericButton label="Supervisor Review" size="medium" theme="normal" />
      <GenericButton label="Save" size="medium" type="submit" theme="normal" />
      <GenericButton label="Delete" size="medium" theme="normal" />
    </div>
  );
}

export default GroupedActionButtons;
