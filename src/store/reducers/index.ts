import { combineReducers } from "@reduxjs/toolkit";

import DashboardSlice from "@/store/reducers/Dashboard/DashboardSlice";

const rootReducer = combineReducers({
  [DashboardSlice.name]: DashboardSlice.reducer,
});

export default rootReducer;
