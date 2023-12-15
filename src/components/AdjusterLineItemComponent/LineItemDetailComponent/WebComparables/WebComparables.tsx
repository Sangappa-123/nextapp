import React from "react";
import webComparablesStyle from "./webComparables.module.scss";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import PriceLimitComparable from "./PriceLimitComparable";
import ComparableSearchBox from "./ComparableSearchBox";
import LoadingSkelton from "./LoadingSkelton";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@/store/store";
import SearchedItem from "./ComparableSearchBox/SearchedItem";
import { unknownObjectType } from "@/constants/customTypes";

const WebComparables: React.FC<connectorType> = (props) => {
  const { isSearching, searchList } = props;
  return (
    <div className={webComparablesStyle.root}>
      <div className={webComparablesStyle.searchContainer}>
        <GenericComponentHeading title="Web Comparable(s)" />
        <div className={webComparablesStyle.searchWraper}>
          <ComparableSearchBox />
          <PriceLimitComparable />
        </div>
      </div>
      <div className={webComparablesStyle.itemListContainer}>
        {!isSearching &&
          searchList &&
          searchList?.map((data: unknownObjectType, i: number) => (
            <SearchedItem key={i} data={data} />
          ))}

        {!isSearching && !searchList && <div>No data</div>}
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
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(WebComparables);
