import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claimedItemsList: [],
  claimedItemsErrorMsg: "",
};

const ClaimedItemsSlice = createSlice({
  initialState,
  name: "claimedItems",
  reducers: {
    addClaimedItemsListData(state, action) {
      const { payload } = action;

      const { claimedData } = payload;
      let newArr = {};
      const claimRes: any = [];
      if (claimedData.data) {
        claimedData.data.itemReplacement.map((item: any) => {
          newArr = {
            ...item.claimItem,
            statusFilter: item.claimItem.status?.status,
            categoryFilter: item.claimItem.category?.categoryName,
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
  },
});
export default ClaimedItemsSlice;

export const { addClaimedItemsListData } = ClaimedItemsSlice.actions;
