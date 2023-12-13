import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import comparableSearchBoxStyle from "./comparableSearchBox.module.scss";
import GenericSelect from "@/components/common/GenericSelect";

function ComparableSearchBox() {
  const [searchValue, setSearchValue] = React.useState("");
  const handleSearch = (e: React.FocusEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
      <GenericSelect formControlClassname={comparableSearchBoxStyle.selectFormControl} />
    </div>
  );
}

export default ComparableSearchBox;
