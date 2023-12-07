"use client";
import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import pendingSearchStyle from "./pendingInvoiceSearchBox.module.scss";
import { fetchUrgentClaimList } from "@/services/ClaimService";
import { addSearchKeyWord } from "@/reducers/UrgentClaimData/UrgentClaimSlice";
import { connect } from "react-redux";

const UrgentClaimSearchBox: React.FC = (props) => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearch = async (e) => {
    setSearchValue(e.target.value);
    if (props.searchKeyword !== "" && e.target.value === "") {
      props.setTableLoader(true);
      props.addSearchKeyWord({ searchKeyword: "" });
      const result = await fetchUrgentClaimList();
      if (result) {
        props.setTableLoader(false);
      }
    }
  };
  const searchKey = async (event) => {
    if (event.key === "Enter") {
      props.addSearchKeyWord({ searchKeyword: event.target.value });
      const result = await fetchUrgentClaimList(
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
    <div className={pendingSearchStyle.searchBox}>
      <RiSearch2Line className={pendingSearchStyle.searchIcon} />
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

const mapStateToProps = ({ urgentclaimdata }) => ({
  searchKeyword: urgentclaimdata.searchKeyword,
});
const mapDispatchToProps = {
  addSearchKeyWord,
};
export default connect(mapStateToProps, mapDispatchToProps)(UrgentClaimSearchBox);
