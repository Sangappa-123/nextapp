import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claimListData: [],
  currentPageNumber: 1,
  totalClaims: 0,
  searchKeyword: "",
};

const ClaimSlice = createSlice({
  initialState,
  name: "claimdata",
  reducers: {
    addClaimListData(state, action) {
      const { payload } = action;
      const { claimData } = payload;

      let newArr = {};
      const claimRes = [];
      claimData.claims.map((item) => {
        newArr = {
          claimNumber: item.claimNumber,
          status: item.status.status,
          noOfItems: item.noOfItems,
          noOfItemsPriced: item.noOfItemsPriced,
          policyHoldersName:
            item.insuredDetails.lastName + ", " + item.insuredDetails.firstName,
          claimDate: item.createDate,
          lastActive: item.lastActivity,
          lastUpdated: item.lastUpdateDate,
          statusNumber: item.status.id,
        };
        claimRes.push(newArr);
      });
      state.claimListData = claimRes;
      state.currentPageNumber = claimData.currentPageNumber;
      state.totalClaims = claimData.totalClaims;
    },
    addSearchKeyWord(state, action) {
      const { payload } = action;
      const { searchKeyword } = payload;

      state.searchKeyword = searchKeyword;
    },
  },
});
export default ClaimSlice;

export const { addClaimListData, addSearchKeyWord } = ClaimSlice.actions;
