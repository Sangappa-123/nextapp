import React from "react";
import GenericButton from "@/components/common/GenericButton";
import groupedActionButtonsStyle from "./groupedActionButtons.module.scss";
import { useAppSelector } from "@/hooks/reduxCustomHook";
import selectScheduledItem from "@/reducers/LineItemDetail/Selectors/selectScheduledItem";

function GroupedActionButtons() {
  const { isScheduledItem, scheduleAmount } = useAppSelector(selectScheduledItem);
  return (
    <div className={groupedActionButtonsStyle.root}>
      <GenericButton
        label="Accept Standard Cost"
        size="medium"
        theme="normal"
        disabled={true}
      />
      <GenericButton label="Supervisor Review" size="medium" theme="normal" />
      <GenericButton
        label="Save"
        size="medium"
        type="submit"
        theme="normal"
        disabled={isScheduledItem && scheduleAmount < 1}
      />
      <GenericButton label="Delete" size="medium" theme="normal" />
    </div>
  );
}

export default GroupedActionButtons;
