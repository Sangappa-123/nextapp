import { combineReducers } from "@reduxjs/toolkit";
import ClaimSlice from "./ClaimData/ClaimSlice";
import SessionSlice from "./Session/SessionSlice";

const rootReducer = combineReducers({
  [SessionSlice.name]: SessionSlice.reducer,
  [ClaimSlice.name]: ClaimSlice.reducer,
});

export default rootReducer;
