import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claimServiceRequestList: [],
  claimErrorMsg: "",
};

const ClaimServiceRequestSlice = createSlice({
  initialState,
  name: "claimServiceRequestdata",
  reducers: {
    addserviceRequestData(state, action) {
      const { payload } = action;
      const { claimServiceRequestList } = payload;

      let newArr = {};
      const claimRes: any = [];
      if (claimServiceRequestList?.data) {
        claimServiceRequestList.data.map((item: any) => {
          newArr = {
            description: item.description,
            serviceNumber: item.serviceNumber,
            vendorDetails: item.vendorDetails,
            assignedDate: item.assignedDate,
            targetDate: item.targetDate,
            status: item.status,
          };
          claimRes.push(newArr);
        });
        state.claimServiceRequestList = claimRes;
        state.claimErrorMsg = "";
        state.totalClaims = claimRes.length;
      } else {
        state.claimErrorMsg = claimServiceRequestList.message;
      }
    },
  },
});
export default ClaimServiceRequestSlice;

export const { addserviceRequestData } = ClaimServiceRequestSlice.actions;
