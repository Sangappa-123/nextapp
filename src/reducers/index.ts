import { combineReducers } from "@reduxjs/toolkit";
import ClaimSlice from "./ClaimData/ClaimSlice";
import SessionSlice from "./Session/SessionSlice";
import NotificationSlice from "./Notification/NotificationSlice";
import DashboardAlertSlice from "./DashboardAlert/DashboardAlertSlice";

const rootReducer = combineReducers({
  [SessionSlice.name]: SessionSlice.reducer,
  [ClaimSlice.name]: ClaimSlice.reducer,
  [NotificationSlice.name]: NotificationSlice.reducer,
  [DashboardAlertSlice.name]: DashboardAlertSlice.reducer,
});

export default rootReducer;
