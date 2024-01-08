"use client";
import React from "react";
import Cards from "@/components/common/Cards";
import GenericSelect from "@/components/common/GenericSelect";
import AssignTableSTyle from "./assignItemsTableComponent.module.scss";
import SelectBoxAssignItems from "./SelectBoxAssignItems";
import ItemsAssignListTable from "./ItemsAssignListTable";
import SearchBoxAssignItems from "./SearchBoxAssignItems";
import VendorSearchBoxAssignItems from "./VendorSearchBoxAssignItems";
import VendorAssignListTable from "./VendorAssignListTable";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";

interface AssignItemsTableComponentProps {
  onNewClaimsClick: () => void;
}

const AssignItemsTableComponent: React.FC<
  AssignItemsTableComponentProps & connectorType
> = (selectedItems) => {
  const options = [
    { value: 1, label: "HOME BRANCH,BR-4ADDE597FE47" },
    { value: 2, label: "Remote Office,201" },
  ];
  const options1 = [
    { value: 1, label: "HOME BRANCH,BR-4ADDE597FE47" },
    { value: 2, label: "No Result Found" },
  ];
  const customStyles = {
    control: (defaultStyles: any) => ({
      ...defaultStyles,
      width: "270px",
      minHeight: "25px",
      maxHeight: "27px",
      display: "flex",
      alignItems: "center",
      fontSize: "12px",
      "@media only screen and (min-width: 2560px)": {
        width: "400px",
        height: "29px",
        marginBottom: "0px",
      },
    }),
    placeholder: (defaultStyles: any) => ({
      ...defaultStyles,
      fontSize: "12px",
      padding: "2px 0px 10px 2px",
    }),
    indicatorSeparator: (defaultStyles: any) => ({
      ...defaultStyles,
      display: "none",
    }),
    dropdownIndicator: (defaultStyles: any) => ({
      ...defaultStyles,
      padding: "2px 0px 10px 2px",
    }),
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      backgroundColor: state.isSelected ? "#e1e5ec" : "white",
      color: "#262626",
      fontFamily: '"Open Sans", sans-serif',
      fontSize: "13px",
      "&:hover": {
        backgroundColor: "#337ab7",
        color: "white",
      },
      "&:active": {
        backgroundColor: "#337ab7",
        color: "white",
      },
    }),
  };
  return (
    <>
      {console.log(selectedItems, "selectedItems in assign items file")}
      <Cards className="mt-2">
        <div className="row">
          <div className="col-md-3 col-sm-6 col-12">
            <label className={AssignTableSTyle.textAddStyle}>
              1) Select the Billable Branch
            </label>
          </div>
          <div className={`col-md-4 col-sm-6 col-12 ${AssignTableSTyle.selectContainer}`}>
            <GenericSelect
              placeholder="Select"
              options={options}
              customStyles={customStyles}
              hideSelectedOptions={false}
            />
          </div>
        </div>
        <div className="row">
          <label className={AssignTableSTyle.textAddStyle}>2) Item(s) To Assign</label>
        </div>
        <div className={AssignTableSTyle.addItemsContainer}>
          <div className={`row gx-2 ${AssignTableSTyle.addItemsContentContainer}`}>
            <div
              className={`col-lg-4 col-md-4 col-sm-12 col-12 mt-2 mb-2 ${AssignTableSTyle.selectItemsStyle}`}
            >
              <SelectBoxAssignItems />
            </div>
            <div
              className={`col-lg-4 col-md-4 col-sm-12 col-12 mt-2 mb-2 ${AssignTableSTyle.searchItemsStyle}`}
            >
              <SearchBoxAssignItems />
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className={AssignTableSTyle.styleTable}>
          <ItemsAssignListTable
          // selectedRowsData={selectedRowsData}
          />
        </div>
      </Cards>
      <Cards className="mt-2">
        <div className="row">
          <label className={AssignTableSTyle.textAddStyle}>3) Select Vendor</label>
        </div>
        <div className={AssignTableSTyle.addItemsContainer}>
          <div className={`row ${AssignTableSTyle.addItemsContentContainer}`}>
            <div
              className={`col-lg-10 col-md-10 col-sm-12 col-12 mt-2 mb-2 ${AssignTableSTyle.vendorsearchItemsStyle}`}
            >
              <VendorSearchBoxAssignItems />
            </div>
          </div>
        </div>
        <div className={AssignTableSTyle.styleTable}>
          <VendorAssignListTable />
        </div>
        <div className="row mt-3">
          <label className={AssignTableSTyle.textAddStyle}>4) Services</label>
        </div>
        <div className="row mt-2">
          <div className="col-1" />
          <div className="col-md-2 col-sm-6 col-12">
            <label className={AssignTableSTyle.textAddStyle}>
              <span style={{ color: "red" }}>*</span> Service Needed
            </label>
          </div>
          <div className={`col-md-4 col-sm-6 col-12 ${AssignTableSTyle.selectContainer}`}>
            <GenericSelect
              placeholder="Select"
              options={options1}
              customStyles={customStyles}
              hideSelectedOptions={false}
            />
          </div>
        </div>
      </Cards>
      <div className={`mt-2 ${AssignTableSTyle.cardsStyle}`}>
        <div className="row">
          <label className={AssignTableSTyle.textAddStyle}>
            5) Remarks/Special Instruction
          </label>
        </div>
        <div className={`row mt-3 ${AssignTableSTyle.textAreaSyle}`}>
          <textarea
            rows={4}
            cols={50}
            maxLength={1000}
            className={AssignTableSTyle.textarea}
          />
          <p className={AssignTableSTyle.textTextArea}>Max. 1000 characters</p>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  addItemsTableData: state.addItemsTable.addItemsTableData,
  selectedItems: state.addItemsTable.selectedItems,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(AssignItemsTableComponent);
