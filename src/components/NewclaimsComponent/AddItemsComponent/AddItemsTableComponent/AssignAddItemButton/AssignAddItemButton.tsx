import React from "react";
import GenericButton from "@/components/common/GenericButton";

interface AddItemsComponentProps {
  onAssignItemsClick: () => void;
}
function AssignAddItemButton({ onAssignItemsClick }: AddItemsComponentProps) {
  return (
    <>
      <GenericButton
        label="Assign Items"
        size="small"
        type="submit"
        onClick={onAssignItemsClick}
      />
    </>
  );
}

export default AssignAddItemButton;
