import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
            status: item.status,
            category: item.category,
            quantity: item.quantity,
            rcvTotal: item.rcvTotal,
            totalStatedAmount: item.totalStatedAmount,
            vendorName: item.vendorName,
            adjusterDescription: item.adjusterDescription,
            itemTag: item.itemTag,
            cashPayoutExposure: item.cashPayoutExposure,
            claimId: claimId,
            itemId: item.id,
          };
          claimRes.push(newArr);
        });
        state.claimContentListData = claimRes;
        state.claimErrorMsg = "";
      } else {
        state.claimErrorMsg = claimContentData.message;
      }
    },
  },
});
export default ClaimContentSlice;

export const { addClaimContentListData } = ClaimContentSlice.actions;
