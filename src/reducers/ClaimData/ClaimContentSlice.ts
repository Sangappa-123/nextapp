import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claimContentListDataFull: [],
  claimContentListData: [],
  claimErrorMsg: "",
};

const ClaimContentSlice = createSlice({
  initialState,
  name: "claimContentdata",
  reducers: {
    addClaimContentListData(state, action) {
      const { payload } = action;
      const { claimContentData, claimId } = payload;

      let newArr = {};
      const claimRes: any = [];
      if (claimContentData.data) {
        claimContentData.data.map((item: any) => {
          newArr = {
            description: item.description,
            status: item.status?.status ?? null,
            category: item.category?.name ?? null,
            quantity: item.quantity,
            rcvTotal: item.rcvTotal,
            totalStatedAmount: item.totalStatedAmount,
            vendorName: item.vendorName,
            adjusterDescription: item.adjusterDescription,
            itemTag: item.itemTag ?? null,
            cashPayoutExposure: item.cashPayoutExposure,
            claimId: claimId,
            itemId: item.id,
          };
          claimRes.push(newArr);
        });
        state.claimContentListDataFull = claimRes;
        state.claimContentListData = claimRes;
        state.claimErrorMsg = "";
      } else {
        state.claimErrorMsg = claimContentData.message;
      }
    },
    updateClaimContentListData(state, action) {
      const { payload } = action;
      const { claimContentList } = payload;
      state.claimContentListData = claimContentList;
    },
    clearFilter(state) {
      state.claimContentListData = state.claimContentListDataFull;
    },
  },
});
export default ClaimContentSlice;

export const { addClaimContentListData, updateClaimContentListData, clearFilter } =
  ClaimContentSlice.actions;
