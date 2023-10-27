import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  initialState: [],
  name: "dashboard",
  reducers: {
    add(state, action) {
      // update the state can be done using the "action.payload"
      return state;
    }
  }
})
export default dashboardSlice.reducer;
export const { add } = dashboardSlice.actions;