import React from "react";
import GenericButton from "@/components/common/GenericButton";
import groupedActionButtonsStyle from "./groupedActionButtons.module.scss";

function GroupedActionButtons() {
  return (
    <div className={groupedActionButtonsStyle.root}>
      <GenericButton label="Accept Standard Cost" size="medium" />
      <GenericButton label="Supervisor Review" size="medium" />
      <GenericButton label="Save" size="medium" type="submit" />
      <GenericButton label="Delete" size="medium" />
    </div>
  );
}

export default GroupedActionButtons;
