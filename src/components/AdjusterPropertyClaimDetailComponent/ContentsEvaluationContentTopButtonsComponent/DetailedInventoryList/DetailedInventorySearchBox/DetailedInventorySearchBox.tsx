"use client";
import React from "react";
import { ConnectedProps, connect } from "react-redux";
import { RiSearch2Line } from "react-icons/ri";
import DetailedInventorySearchStyle from "./DetailedInventorySearchBox.module.scss";
import { searchDetailedInventory } from "@/services/ContentsEvaluationService.ts";
import { addDetailedInventorySearchKeyWord } from "@/reducers/ContentsEvaluation/DetailedInventorySlice";

interface typeProps {
  setTableLoader: React.SetStateAction<any>;
}
const DetailedInventorySearchBox: React.FC<connectorType & typeProps> = (props) => {
  const [searchValue, setSearchValue] = React.useState("");
  const {
    setTableLoader,
    searchKeyword,
    addDetailedInventorySearchKeyWord,
  }: React.SetStateAction<any> = props;

  const handleSearch = async (e: any) => {
    setSearchValue(e.target.value);
    if (searchKeyword !== "" && e.target.value === "") {
      setTableLoader(true);
      addDetailedInventorySearchKeyWord({ searchKeyword: "" });
      const result = await searchDetailedInventory();
      if (result) {
        setTableLoader(false);
      }
    }
  };
  const searchKey = async (event: any) => {
    if (event.key === "Enter") {
      setTableLoader(true);
      addDetailedInventorySearchKeyWord({ searchKeyword: event.target.value });
      const result = await searchDetailedInventory(event.target.value);
      if (result) {
        setTableLoader(false);
      }
    }
  };

  return (
    <div className={DetailedInventorySearchStyle.searchBox}>
      <RiSearch2Line className={DetailedInventorySearchStyle.searchIcon} />
      <input
        type="text"
        placeholder="Item description, Room, Category"
        value={searchValue}
        onChange={(e) => handleSearch(e)}
        onKeyDown={(e) => searchKey(e)}
      />
    </div>
  );
};

const mapStateToProps = ({ claimServiceRequestdata }: any) => ({
  searchKeyword: claimServiceRequestdata.searchKeyword,
});
const mapDispatchToProps = {
  addDetailedInventorySearchKeyWord,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(DetailedInventorySearchBox);
