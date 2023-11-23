"use client";
import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import OpenClaimsSearchStyle from "./OpenClaimsSearchBox.module.scss";
import { fetchClaimList } from "@/services/ClaimService";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
import { addSearchKeyWord } from "@/reducers/ClaimData/ClaimSlice";

const OpenClaimsSearchBox: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const dispatch = useAppDispatch();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const searchKey = (event) => {
    if (event.key === "Enter") {
      dispatch(addSearchKeyWord({ searchKeyword: event.target.value }));
      fetchClaimList(1, 20, "createDate", "desc", event.target.value);
    }
  };

  return (
    <div className={OpenClaimsSearchStyle.searchBox}>
      <RiSearch2Line className={OpenClaimsSearchStyle.searchIcon} />
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearch}
        onKeyDown={searchKey}
      />
    </div>
  );
};

export default OpenClaimsSearchBox;
