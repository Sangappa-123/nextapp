import React from "react";
import GenericButton from "@/components/common/GenericButton";
interface AssignAddItemButtonProps {
  isAnyItemSelected: boolean;
  // onAssignItemsClick: () => void;
  onClick: () => void;
}

const AssignAddItemButton: React.FC<AssignAddItemButtonProps> = ({
  isAnyItemSelected,
  // onAssignItemsClick,
  onClick,
}) => {
  return (
    <>
      <GenericButton
        label="Assign Items"
        size="small"
        type="submit"
        disabled={isAnyItemSelected === undefined || !isAnyItemSelected}
        onClick={onClick}
      />
    </>
  );
};

export default AssignAddItemButton;
