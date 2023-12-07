import React from "react";
import GenericButton from "@/components/common/GenericButton";

const LoadFileAddItemButton: React.FC = () => {
  return (
    <>
      <GenericButton
        label="Load From File"
        theme="lightBlue"
        size="small"
        type="submit"
      />
    </>
  );
};

export default LoadFileAddItemButton;
