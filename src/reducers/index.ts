import { combineReducers } from "@reduxjs/toolkit";

import SessionSlice from "./Session/SessionSlice";

const rootReducer = combineReducers({
  [SessionSlice.name]: SessionSlice.reducer,
});

export default rootReducer;
