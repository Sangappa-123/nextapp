import React from "react";
import ArrowStyle from "./newClaimWizardFormArrow.module.scss";

const NewClaimWizardFormArrow: React.FC = () => {
  return (
    <div className={ArrowStyle.arrowButton}>
      {/* <div className="row"> */}
      <div className={ArrowStyle.arrowText}>Claims and Policy Information</div>
    </div>
    // </div>
  );
};

export default NewClaimWizardFormArrow;
