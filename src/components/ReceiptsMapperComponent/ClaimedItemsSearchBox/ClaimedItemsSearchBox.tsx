"use client";
import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import ClaimedItemsSearchBoxStyle from "./ClaimedItemsSearchBox.module.scss";
import { addClaimedItemsKeyWord } from "@/reducers/ReceiptMapper/ClaimedItemsSlice";
import { ConnectedProps, connect } from "react-redux";
import { getClaimedItems } from "@/services/ReceiptMapper/ReceiptMapperService";

interface typeProps {
  setTableLoader: React.SetStateAction<any>;
}
const ClaimedItemsSearchBox: React.FC<connectorType & typeProps> = (props) => {
  const [searchValue, setSearchValue] = React.useState("");
  const {
    setTableLoader,
    searchKeyword,
    addClaimedItemsKeyWord,
  }: React.SetStateAction<any> = props;

  const handleSearch = async (e: any) => {
    const claimNumber = sessionStorage.getItem("claimNumber") ?? "";
    setSearchValue(e.target.value);
    if (searchKeyword !== "" && e.target.value === "") {
      setTableLoader(true);
      addClaimedItemsKeyWord({ searchKeyword: "" });
      const result = await getClaimedItems({
        claimNumber: claimNumber,
        reqForReceiptMapper: true,
      });
      if (result) {
        setTableLoader(false);
      }
    }
  };
  const searchKey = async (event: any) => {
    if (event.key === "Enter") {
      setTableLoader(true);
      addClaimedItemsKeyWord({ searchKeyword: event.target.value });
      //  claimedItemsList.filter(item => item.description.toLowerCase() === description.toLowerCase())[0];

      // const result = await fetchContentList(event.target.value);
      // if (result) {
      //   setTableLoader(false);
      // }
    }
  };

  return (
    <div className={ClaimedItemsSearchBoxStyle.searchBox}>
      <RiSearch2Line className={ClaimedItemsSearchBoxStyle.searchIcon} />
      <input
        type="text"
        placeholder="Search By Description"
        value={searchValue}
        onChange={handleSearch}
        onKeyDown={searchKey}
      />
    </div>
  );
};

const mapStateToProps = ({ claimedItems }: any) => ({
  searchKeyword: claimedItems.searchKeyword,
  // claimedItemsList:
});
const mapDispatchToProps = {
  addClaimedItemsKeyWord,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ClaimedItemsSearchBox);
