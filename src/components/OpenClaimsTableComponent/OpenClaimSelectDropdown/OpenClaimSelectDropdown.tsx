"use client";
import React, {useState, useEffect} from "react";
import OpenClaimsDropdownStyle from "./OpenClaimSelectDropdown.module.scss";
import { default as ReactSelect } from "react-select";
import GenericSelect from "@/components/common/GenericSelect/index";
import { fetchClaimList } from "@/services/ClaimService";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
import { addFilterValues } from "@/reducers/ClaimData/ClaimSlice";

const OpenClaimSelectDropdown: React.FC = () => {
  const dispatch = useAppDispatch();

  const options = [
    { value: 3, label: '3rd Party Vendor'},
    { value: 1, label: 'Created'},
    { value: 5, label: 'Supervisor Approval'},
    { value: 2, label: 'Work In Progress'},

  ]
  const [selected, setSelected] = useState([{value: 0, label: 'All'}]);
  useEffect(()=>{
    const selectedValues = [];
    if(selected.length > 1){
      selected.map((item)=>{
        if(item.value !== 0)
        selectedValues.push(item.value);
      });
      dispatch(addFilterValues({ statusIds: selectedValues }));
      fetchClaimList(1, 20, "createDate", "desc", "", selectedValues);
    }else{
      dispatch(addFilterValues({ statusIds: null }));
      fetchClaimList();
    }
  },[selected]);

  const customStyles = {
    control: (defaultStyles: any) => ({
      ...defaultStyles,
      width: '224.6px',
      minHeight: '28px',
      maxHeight: '76.28px',
    }),
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      backgroundColor: state.isSelected ? '#e1e5ec': 'white',
      color: '#262626',
      fontFamily: '"Open Sans", sans-serif',
fontSize: "13px",
      '&:hover': {
        backgroundColor: '#337ab7',
      color: 'white',

      },
      '&:active': {
        backgroundColor: '#337ab7',
      color: 'white',

      },
    }),
    valueContainer: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        minHeight: '28px',
        fontSize: "12px",
      };
    },
    indicatorsContainer: (prevStyle, state) => state.isMulti ? ({
      ...prevStyle,
      display: 'none',
  }): null,
  };
  
      return (
    <div className={OpenClaimsDropdownStyle.claimStatusContainer}>
      <span className={OpenClaimsDropdownStyle.textClaimStatus}>Claim Status</span>
      <GenericSelect
            placeholder="Select"
            options={options}
            isMulti = {true}
            customMenuWithClear = {true}
            customStyles={customStyles}
            selected = {selected}
            setSelected = {setSelected}
            hideSelectedOptions = {false}
          />
     
    </div>
  );
};

export default OpenClaimSelectDropdown;
