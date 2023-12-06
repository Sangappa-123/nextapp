"use client";
import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import SearchAddStyle from "./searchBoxAddItems.module.scss";

const SearchBoxAddItems: React.FC = () => {
  return (
    <div className={SearchAddStyle.searchBox}>
      <RiSearch2Line className={SearchAddStyle.searchIcon} />
      <input type="text" placeholder="Search..." />
    </div>
  );
};

export default SearchBoxAddItems;
