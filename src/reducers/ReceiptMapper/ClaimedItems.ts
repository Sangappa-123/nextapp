import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
 claimedItemsList : [],
 claimedItemsErrorMsg : ""
};


const ClaimedItemsSlice = createSlice({
  initialState,
  name: "ClaimedItems",
  reducers: {
    addClaimedItemsListData(state, action) {
      const { payload } = action;
      const { claimedData } = payload;

      let newArr = {};
      const claimRes: any = [];
      if (claimedData.data?.itemReplacement) {
        claimedData.data.itemReplacement.map((item: any) => {
          newArr = {
           ...item,
            selected: false,
          };
          claimRes.push(newArr);
        });
        state.claimedItemsList = claimRes;
        state.claimedItemsErrorMsg = "";
      } else {
        state.claimedItemsErrorMsg = claimedData.message;
      }
    },
  }
 
});
export default ClaimedItemsSlice;

export const {
  addClaimedItemsListData,
  
} = ClaimedItemsSlice.actions;
