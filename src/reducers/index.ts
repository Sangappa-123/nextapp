import { combineReducers } from "@reduxjs/toolkit";
import ClaimSlice from "./ClaimData/ClaimSlice";
import SessionSlice from "./Session/SessionSlice";
import NotificationSlice from "./Notification/NotificationSlice";

const rootReducer = combineReducers({
  [SessionSlice.name]: SessionSlice.reducer,
  [ClaimSlice.name]: ClaimSlice.reducer,
  [NotificationSlice.name]: NotificationSlice.reducer,
});

export default rootReducer;
