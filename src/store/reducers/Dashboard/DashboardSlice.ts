import { createSlice } from "@reduxjs/toolkit";

const DashboardSlice = createSlice({
  initialState: [],
  name: "dashboard",
  reducers: {
    add(state, action) {
      // update the state can be done using the "action.payload"
      return state;
    }
  }
})
export default DashboardSlice;

export const { add } = DashboardSlice.actions;