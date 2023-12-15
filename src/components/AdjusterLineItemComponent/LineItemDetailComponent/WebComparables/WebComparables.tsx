import React, { useState } from "react";
import webComparablesStyle from "./webComparables.module.scss";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import PriceLimitComparable from "./PriceLimitComparable";
import ComparableSearchBox from "./ComparableSearchBox";
import LoadingSkelton from "./LoadingSkelton";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@/store/store";
import SearchedItem from "./ComparableSearchBox/SearchedItem";
import { unknownObjectType } from "@/constants/customTypes";
import { searchComparable } from "@/reducers/LineItemDetail/LineItemDetailSlice";
import { WEB_SEARCH_ENGINES } from "@/constants/constants";
import NoRecordComponent from "@/components/common/NoRecordComponent/NoRecordComponent";

export interface searchInputType {
  endPrice: number;
  startPrice: number;
  searchKey: string;
  // selectedEngine: typeof WEB_SEARCH_ENGINES;
}

const WebComparables: React.FC<connectorType> = (props) => {
  const {
    isSearching,
    searchList,
    searchComparable,
    priceFrom,
    priceTo,
    searchKey,
    selectedEngine,
  } = props;
  const [searchInput, setSearchInput] = useState<searchInputType>({
    startPrice: priceFrom,
    endPrice: priceTo,
    searchKey,
  });

  const searchByEngine = (engine: typeof WEB_SEARCH_ENGINES) => {
    const payload = { ...searchInput, selectedEngine: engine };
    searchComparable(payload);
  };

  const startSearch = () => {
    searchComparable(searchInput);
  };

  const updateState = (key: string, value: string | number | object) => {
    setSearchInput((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={webComparablesStyle.root}>
      <div className={webComparablesStyle.searchContainer}>
        <GenericComponentHeading title="Web Comparable(s)" />
        <div className={webComparablesStyle.searchWraper}>
          <ComparableSearchBox
            selectedEngine={selectedEngine}
            searchKey={searchInput.searchKey}
            updateState={updateState}
            handleSubmit={startSearch}
            isSearching={isSearching}
            searchByEngine={searchByEngine}
          />
          <PriceLimitComparable
            startPrice={searchInput.startPrice}
            endPrice={searchInput.endPrice}
            handleSubmit={startSearch}
            updateState={updateState}
            isSearching={isSearching}
          />
        </div>
      </div>
      <div className={webComparablesStyle.itemListContainer}>
        {!isSearching &&
          searchList?.length > 0 &&
          searchList?.map((data: unknownObjectType, i: number) => (
            <SearchedItem key={i} data={data} />
          ))}

        {!isSearching && searchList?.length === 0 && (
          <div className={webComparablesStyle.noDataDiv}>
            <NoRecordComponent message="No searched result" />
          </div>
        )}
        {isSearching && (
          <>
            <LoadingSkelton />
            <LoadingSkelton />
            <LoadingSkelton />
            <LoadingSkelton />
            <LoadingSkelton />
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isSearching: state.lineItemDetail.webSearch.isSearching,
  searchList: state.lineItemDetail.webSearch.searchList,
  priceFrom: state.lineItemDetail.webSearch.priceFrom,
  priceTo: state.lineItemDetail.webSearch.priceTo,
  searchKey: state.lineItemDetail.webSearch.searchKey,
  selectedEngine: state.lineItemDetail.webSearch.selectedEngine,
});

const mapDispatchToProps = {
  searchComparable,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(WebComparables);
