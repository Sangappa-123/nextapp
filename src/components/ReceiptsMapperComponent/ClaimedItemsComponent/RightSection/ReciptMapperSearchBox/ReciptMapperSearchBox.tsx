"use client";
import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import ReciptMapperSearchBoxStyles from "./reciptMapperSearchBox.module.scss";
import {
  addClaimedItemsKeyWord,
  updateClaimedItemsListData,
} from "@/reducers/ReceiptMapper/ClaimedItemsSlice";
import { ConnectedProps, connect } from "react-redux";
import { getClaimedItems } from "@/services/ReceiptMapper/ReceiptMapperService";

interface typeProps {
  setListLoader: React.SetStateAction<any>;
}
const ReciptMapperSearchBox: React.FC<connectorType & typeProps> = (props) => {
  const [searchValue, setSearchValue] = React.useState("");
  const {
    setListLoader,
    searchKeyword,
    addClaimedItemsKeyWord,
    claimedItemsList,
    updateClaimedItemsListData,
  }: React.SetStateAction<any> = props;

  const handleSearch = async (e: any) => {
    const claimNumber = sessionStorage.getItem("claimNumber") ?? "";
    setSearchValue(e.target.value);
    if (searchKeyword !== "" && e.target.value === "") {
      setListLoader(true);
      addClaimedItemsKeyWord({ searchKeyword: "" });
      const result = await getClaimedItems({
        claimNumber: claimNumber,
        reqForReceiptMapper: true,
      });
      if (result) {
        setListLoader(false);
      }
    }
  };
  const searchKey = async (event: any) => {
    if (event.key === "Enter") {
      setListLoader(true);
      addClaimedItemsKeyWord({ searchKeyword: event.target.value });
      const searchWord = event.target.value;
      const updatedData = claimedItemsList.filter((item: any) =>
        item.description.toLowerCase().includes(searchWord.toLowerCase())
      );
      await updateClaimedItemsListData({ claimedData: updatedData });
      if (updatedData) {
        setListLoader(false);
      }
    }
  };

  return (
    <div className={ReciptMapperSearchBoxStyles.searchBox}>
      <RiSearch2Line className={ReciptMapperSearchBoxStyles.searchIcon} />
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearch}
        onKeyDown={searchKey}
      />
    </div>
  );
};

const mapStateToProps = ({ claimedItems }: any) => ({
  searchKeyword: claimedItems.searchKeyword,
  claimedItemsList: claimedItems.claimedItemsList,
});
const mapDispatchToProps = {
  addClaimedItemsKeyWord,
  updateClaimedItemsListData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ReciptMapperSearchBox);
