"use client";
import React, { useState } from "react";
import OpenClaimsDropdownStyle from "./OpenClaimSelectDropdown.module.scss";
// import { default as ReactSelect } from "react-select";
import GenericSelect from "@/components/common/GenericSelect/index";
import { fetchClaimList } from "@/services/ClaimService";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
import { addFilterValues } from "@/reducers/ClaimData/ClaimSlice";

const OpenClaimSelectDropdown: React.FC = (props) => {
  const dispatch = useAppDispatch();

  const options = [
    { value: 0, label: "All" },
    { value: 3, label: "3rd Party Vendor" },
    { value: 1, label: "Created" },
    { value: 5, label: "Supervisor Approval" },
    { value: 2, label: "Work In Progress" },
  ];
  const [selected, setSelected] = useState([{ value: 0, label: "All" }]);

  const handleSelectChange = async (selectedVal) => {
    await setSelected(selectedVal);
    props.setTableLoader(true);

    const selectedValues = [];
    const isFound = selectedVal.some((element) => {
      return element.value === 0;
    });

    if (isFound) {
      setSelected((current) =>
        current.filter((item) => {
          return item.value !== 0;
        })
      );
      selectedVal = selectedVal.filter((item) => {
        return item.value !== 0;
      });
    }

    if (selectedVal.length > 0 && selectedVal[0].value !== 0) {
      selectedVal.map((item) => {
        if (item.value !== 0) selectedValues.push(item.value);
      });

      dispatch(addFilterValues({ statusIds: selectedValues }));
      const result = await fetchClaimList(
        1,
        20,
        "createDate",
        "desc",
        "",
        selectedValues
      );
      if (result) {
        props.setTableLoader(false);
      }
    } else if (selectedVal.length === 0) {
      dispatch(addFilterValues({ statusIds: null }));
      const result = await fetchClaimList();
      if (result) {
        props.setTableLoader(false);
      }
    }
  };

  const customStyles = {
    control: (defaultStyles: any) => ({
      ...defaultStyles,
      width: "227.9px",
      minHeight: "28px",
      maxHeight: "76.28px",
      marginBottom: "3px",
      "@media only screen and (min-width: 2560px)": {
        width: "500px",
        height: "29px",
        marginBottom: "0px",
      },
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
    valueContainer: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        minHeight: "28px",
        fontSize: "12px",
      };
    },
    indicatorsContainer: (prevStyle, state) =>
      state.isMulti
        ? {
            ...prevStyle,
            display: "none",
          }
        : null,
  };

  return (
    <div className={OpenClaimsDropdownStyle.claimStatusContainer}>
      <p className={OpenClaimsDropdownStyle.textClaimStatus}>Claim Status</p>
      <GenericSelect
        placeholder="Select"
        options={options}
        isMulti={true}
        customMenuWithClear={true}
        customStyles={customStyles}
        selected={selected}
        handleSelectChange={handleSelectChange}
        hideSelectedOptions={false}
      />
    </div>
  );
};

export default OpenClaimSelectDropdown;
