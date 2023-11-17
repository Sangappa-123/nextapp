import React from "react";
import OpenClaimsDropdownStyle from "./OpenClaimSelectDropdown.module.scss";

const OpenClaimSelectDropdown: React.FC = () => {
  return (
    <div className={OpenClaimsDropdownStyle.claimStatusContainer}>
      <span className={OpenClaimsDropdownStyle.textClaimStatus}>Claim Status</span>
      {/* <select className={OpenClaimsDropdownStyle.claimStatusDropdown}>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select> */}
    </div>
  );
};

export default OpenClaimSelectDropdown;
