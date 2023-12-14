import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import comparableSearchBoxStyle from "./comparableSearchBox.module.scss";
import GenericSelect from "@/components/common/GenericSelect";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import { WEB_SEARCH_ENGINES } from "@/constants/constants";

const ComparableSearchBox: React.FC<connectorType> = (props) => {
  const { searchKey, selectedEngine } = props;
  const [searchValue, setSearchValue] = React.useState(searchKey);

  const handleSearch = (e: React.FocusEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleKeyDown = () => {};

  // if (isSearching) return null;
  return (
    <div className={comparableSearchBoxStyle.root}>
      <div className={comparableSearchBoxStyle.searchBox}>
        <RiSearch2Line className={comparableSearchBoxStyle.searchIcon} />
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </div>
      <GenericSelect
        formControlClassname={comparableSearchBoxStyle.selectFormControl}
        options={WEB_SEARCH_ENGINES}
        getOptionLabel={(option: { name: any }) => option.name}
        getOptionValue={(option: { id: any }) => option.id}
        name="engine"
        selected={selectedEngine}
        isClearable={false}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isSearching: state.lineItemDetail.webSearch.isSearching,
  searchKey: state.lineItemDetail.webSearch.searchKey,
  selectedEngine: state.lineItemDetail.webSearch.selectedEngine,
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ComparableSearchBox);
