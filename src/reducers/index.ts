import { combineReducers } from "@reduxjs/toolkit";
import ClaimSlice from "./ClaimData/ClaimSlice";
import ClaimContentSlice from "./ClaimData/ClaimContentSlice";
import UrgentClaimSlice from "./UrgentClaimData/UrgentClaimSlice";
import SessionSlice from "./Session/SessionSlice";
import NotificationSlice from "./Notification/NotificationSlice";
import DashboardAlertSlice from "./DashboardAlert/DashboardAlertSlice";
import PendingInvoiceSlice from "./PendingInvoice/PendingInvoiceSlice";

const rootReducer = combineReducers({
  [SessionSlice.name]: SessionSlice.reducer,
  [ClaimSlice.name]: ClaimSlice.reducer,
  [ClaimContentSlice.name]: ClaimContentSlice.reducer,
  [UrgentClaimSlice.name]: UrgentClaimSlice.reducer,
  [NotificationSlice.name]: NotificationSlice.reducer,
  [DashboardAlertSlice.name]: DashboardAlertSlice.reducer,
  [PendingInvoiceSlice.name]: PendingInvoiceSlice.reducer,
});

export default rootReducer;
