import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claimListData: [],
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
      claimData.map((item) => {
        newArr = {
          claimNumber: item.claimNumber,
          status: item.status.status,
          noOfItems: item.noOfItems,
          noOfItemsPriced: item.noOfItemsPriced,
          policyHoldersName: item.insuredDetails.lastName,
          claimDate: item.createDate,
          lastActive: item.lastActivity,
          lastUpdated: item.lastUpdateDate,
          statusNumber: item.status.id,
        };
        claimRes.push(newArr);
      });
      state.claimListData = claimRes;
    },
  },
});
export default ClaimSlice;

export const { addClaimListData } = ClaimSlice.actions;
