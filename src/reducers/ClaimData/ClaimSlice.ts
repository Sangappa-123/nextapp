import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claimListData: [],
  currentPageNumber: 1,
  totalClaims: 0,
  searchKeyword: "",
  statusIds: null,
  claimErrorMsg: "",
  claimDetail: {},
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
      if (claimData.data) {
        claimData.data.claims.map((item) => {
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
        state.currentPageNumber = claimData.data.currentPageNumber;
        state.totalClaims = claimData.data.totalClaims;
        state.claimErrorMsg = "";
      } else {
        state.claimErrorMsg = claimData.message;
      }
    },
    addSearchKeyWord(state, action) {
      const { payload } = action;
      const { searchKeyword } = payload;

      state.searchKeyword = searchKeyword;
    },
    addFilterValues(state, action) {
      const { payload } = action;
      const { statusIds } = payload;

      state.statusIds = statusIds;
    },
    addSelectedClaimDetails(state, action) {
      const { payload } = action;
      const { claimData } = payload;

      state.claimDetail = claimData;
    },
  },
});
export default ClaimSlice;

export const {
  addClaimListData,
  addSearchKeyWord,
  addFilterValues,
  addSelectedClaimDetails,
} = ClaimSlice.actions;
