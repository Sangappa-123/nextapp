import { combineReducers } from "@reduxjs/toolkit";

import SessionSlice from "./Session/SessionSlice";
import NotificationSlice from "./Notification/NotificationSlice";

const rootReducer = combineReducers({
  [SessionSlice.name]: SessionSlice.reducer,
  [NotificationSlice.name]: NotificationSlice.reducer,
});

export default rootReducer;
