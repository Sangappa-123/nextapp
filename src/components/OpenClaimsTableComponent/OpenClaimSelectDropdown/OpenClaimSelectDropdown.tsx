import React from "react";
import OpenClaimsDropdownStyle from "./OpenClaimSelectDropdown.module.scss";

const OpenClaimSelectDropdown: React.FC = () => {
  return (
    <div className={OpenClaimsDropdownStyle.claimStatusContainer}>
      <span className={OpenClaimsDropdownStyle.textClaimStatus}>Claim Status</span>
      <select className={OpenClaimsDropdownStyle.claimStatusDropdown}>
        <option value="">All</option>
        <option value="3">3rd Party Vendor</option>
        <option value="1">Created</option>
        <option value="5">Supervisor Approval</option>
        <option value="2">Work In Progress</option>
      </select>
    </div>
  );
};

export default OpenClaimSelectDropdown;
