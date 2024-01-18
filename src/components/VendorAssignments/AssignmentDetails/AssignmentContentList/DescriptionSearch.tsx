"use client";
import React from "react";
import { ConnectedProps, connect } from "react-redux";
import { RiSearch2Line } from "react-icons/ri";
import AssignmentContentListStyle from "./AssignmentContentListStyle.module.scss";
import { addDetailedInventorySearchKeyWord } from "@/reducers/ContentsEvaluation/DetailedInventorySlice";
import useTranslation from "@/hooks/useTranslation";
import { contentsEvaluationTranslateType } from "@/translations/contentsEvaluationTranslate/en";
import CustomLoader from "@/components/common/CustomLoader/index";

interface typeProps {
  setTableLoader: React.SetStateAction<any>;
}
const DescriptionSearch: React.FC<connectorType & typeProps> = (props) => {
  const [searchValue, setSearchValue] = React.useState("");
  const { searchKeyword, addDetailedInventorySearchKeyWord }: React.SetStateAction<any> =
    props;

  const {
    loading,
    translate,
  }: { loading: boolean; translate: contentsEvaluationTranslateType | undefined } =
    useTranslation("contentsEvaluationTranslate");

  const handleSearch = async (e: any) => {
    setSearchValue(e.target.value);
    if (searchKeyword !== "" && e.target.value === "") {
      addDetailedInventorySearchKeyWord({ searchKeyword: "" });
    }
  };
  const searchKey = async (event: any) => {
    if (event.key === "Enter") {
      addDetailedInventorySearchKeyWord({ searchKeyword: event.target.value });
    }
  };
  if (loading) {
    return (
      <div className="col-12 d-flex flex-column position-relative">
        <CustomLoader loaderType="spinner2" />
      </div>
    );
  }
  return (
    <div className={AssignmentContentListStyle.searchBox}>
      <RiSearch2Line className={AssignmentContentListStyle.searchIcon} />
      <input
        type="text"
        placeholder={translate?.detailedInventory?.searchPlaceHolder}
        value={searchValue}
        onChange={(e) => handleSearch(e)}
        onKeyDown={(e) => searchKey(e)}
      />
    </div>
  );
};

const mapStateToProps = ({ detailedInventorydata }: any) => ({
  searchKeyword: detailedInventorydata.searchKeyword,
});
const mapDispatchToProps = {
  addDetailedInventorySearchKeyWord,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(DescriptionSearch);
