"use client";
import ClaimsButtonStyle from "./claimsAllViewButton.module.scss";

const ClaimsAllViewButton: React.FC = () => {
  return (
    <div className="text-right">
      <a
        href="adjuster-dashboard/claims-need-attention"
        className={ClaimsButtonStyle.anchorStyle}
      >
        View All Urgent Claims
      </a>
    </div>
  );
};

export default ClaimsAllViewButton;
