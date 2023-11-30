"use client";
import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import OpenClaimsSearchStyle from "./OpenClaimsSearchBox.module.scss";
import { fetchClaimList } from "@/services/ClaimService";
import { addSearchKeyWord } from "@/reducers/ClaimData/ClaimSlice";
import { connect } from "react-redux";

const OpenClaimsSearchBox: React.FC = (props) => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearch = async (e) => {
    setSearchValue(e.target.value);
    if (props.searchKeyword !== "" && e.target.value === "") {
      props.setTableLoader(true);
      props.addSearchKeyWord({ searchKeyword: "" });
      const result = await fetchClaimList();
      if (result) {
        props.setTableLoader(false);
      }
    }
  };
  const searchKey = async (event) => {
    if (event.key === "Enter") {
      props.addSearchKeyWord({ searchKeyword: event.target.value });
      const result = await fetchClaimList(
        1,
        20,
        "createDate",
        "desc",
        event.target.value
      );
      if (result) {
        props.setTableLoader(false);
      }
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

const mapStateToProps = ({ claimdata }) => ({
  searchKeyword: claimdata.searchKeyword,
});
const mapDispatchToProps = {
  addSearchKeyWord,
};
export default connect(mapStateToProps, mapDispatchToProps)(OpenClaimsSearchBox);
