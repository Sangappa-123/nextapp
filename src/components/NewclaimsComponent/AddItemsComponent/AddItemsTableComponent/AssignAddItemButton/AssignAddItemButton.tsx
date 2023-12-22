import React from "react";
import GenericButton from "@/components/common/GenericButton";

interface AssignAddItemButtonProps {
  onAssignItemsClick: () => void;
  isButtonDisabled: boolean;
}

function AssignAddItemButton({
  onAssignItemsClick,
  isButtonDisabled,
}: AssignAddItemButtonProps) {
  return (
    <>
      <GenericButton
        label="Assign Items"
        size="small"
        type="submit"
        onClick={onAssignItemsClick}
        disabled={isButtonDisabled}
      />
    </>
  );
}

export default AssignAddItemButton;
