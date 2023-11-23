import React from "react";
import ClaimsButtonStyle from "./claimsAllViewButton.module.scss";

const ClaimsAllViewButton: React.FC = () => {
  return (
    <div className="text-right">
      <a href="#" className={ClaimsButtonStyle.anchorStyle}>
        View All Urgent Claims
      </a>
    </div>
  );
};

export default ClaimsAllViewButton;
