import { combineReducers } from "@reduxjs/toolkit";

import DashboardSlice from "@/reducers/Dashboard/DashboardSlice";
import SessionSlice from "./Session/SessionSlice";

const rootReducer = combineReducers({
  [DashboardSlice.name]: DashboardSlice.reducer,
  [SessionSlice.name]: SessionSlice.reducer,
});

export default rootReducer;
