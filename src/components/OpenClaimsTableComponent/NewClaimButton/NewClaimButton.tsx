import React from "react";
import GenericButton from "@/components/common/GenericButton";
import NewClaimButtonStyle from "./NewClaimButton.module.scss";

const NewClaimButton: React.FC = () => {
  return (
    <div className={NewClaimButtonStyle.newClaimButton}>
      <GenericButton
        label="New Claim"
        theme="normal"
        type="submit"
        btnClassname={NewClaimButtonStyle.newClaimBtn}
      />
    </div>
  );
};

export default NewClaimButton;
