import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claimServiceRequestData: [],
  claimErrorMsg: "",
};

const ClaimServiceRequestSlice = createSlice({
  initialState,
  name: "claimServiceRequestdata",
  reducers: {
    addserviceRequestData(state, action) {
      const { payload } = action;
      const { claimServiceRequestData } = payload;

      let newArr = {};
      const claimRes: any = [];
      if (claimServiceRequestData.data) {
        claimServiceRequestData.data.map((item: any) => {
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
          };
          claimRes.push(newArr);
        });
        state.claimServiceRequestData = claimRes;
        state.claimErrorMsg = "";
      } else {
        state.claimErrorMsg = claimServiceRequestData.message;
      }
    },
  },
});
export default ClaimServiceRequestSlice;

export const { addserviceRequestData } = ClaimServiceRequestSlice.actions;
