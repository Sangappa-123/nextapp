import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claimServiceRequestList: [],
  claimServiceRequestListTotalData: [],
  claimErrorMsg: "",
  totalClaims: 0,
  searchKeyword: null,
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
        state.claimServiceRequestList = claimRes.slice(0, 5);
        state.claimServiceRequestListTotalData = claimRes;

        state.claimErrorMsg = "";
        state.totalClaims = claimRes.length;
      } else {
        state.claimErrorMsg = claimServiceRequestList.message;
      }
    },
    updateServiceRequestVisibleData(state, action) {
      const { payload } = action;
      const { claimServiceRequestList } = payload;

      state.claimServiceRequestList = claimServiceRequestList;
    },
    addServiceSearchKeyWord(state, action) {
      const { payload } = action;
      const { searchKeyword } = payload;

      state.searchKeyword = searchKeyword;
    },
  },
});
export default ClaimServiceRequestSlice;

export const {
  addserviceRequestData,
  updateServiceRequestVisibleData,
  addServiceSearchKeyWord,
} = ClaimServiceRequestSlice.actions;
