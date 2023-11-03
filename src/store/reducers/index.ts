import { combineReducers } from "@reduxjs/toolkit";

import DashboardSlice from "@/store/reducers/Dashboard/DashboardSlice";
import AppVesionInfoSlice from "./AppVesionInfo/AppVesionInfoSlice";

const rootReducer = combineReducers({
  [DashboardSlice.name]: DashboardSlice.reducer,
  [AppVesionInfoSlice.name]: AppVesionInfoSlice.reducer,
});

export default rootReducer;
