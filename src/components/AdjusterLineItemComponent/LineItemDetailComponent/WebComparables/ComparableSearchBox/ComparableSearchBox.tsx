import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import comparableSearchBoxStyle from "./comparableSearchBox.module.scss";
import GenericSelect from "@/components/common/GenericSelect";

function ComparableSearchBox() {
  const [searchValue, setSearchValue] = React.useState("");
  const handleSearch = () => {
    setSearchValue("abc");
  };
  const searchKey = () => {};
  return (
    <div className={comparableSearchBoxStyle.root}>
      <div className={comparableSearchBoxStyle.searchBox}>
        <RiSearch2Line className={comparableSearchBoxStyle.searchIcon} />
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearch}
          onKeyDown={searchKey}
        />
      </div>
      <GenericSelect />
    </div>
  );
}

export default ComparableSearchBox;
