import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import OpenClaimsSearchStyle from "./OpenClaimsSearchBox.module.scss";

const OpenClaimsSearchBox: React.FC = () => {
  return (
    <div className={OpenClaimsSearchStyle.searchBox}>
      <RiSearch2Line className={OpenClaimsSearchStyle.searchIcon} />
      <input type="text" placeholder="Search..." />
    </div>
  );
};

export default OpenClaimsSearchBox;
