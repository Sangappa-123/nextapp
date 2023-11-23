import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoaded: false,
  isFetching: false,
  notifications: [],
  messages: [],
  page: 0,
  totalCount: 0,
  totalPage: 0,
};
const DashboardAlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert(state, action) {
      if (!state.isLoaded) {
        state.isLoaded = true;
        const { notifications, totalCount, page } = action.payload;
        for (const data of notifications.splice(5)) {
          console.log(data.notificationPurpose);
          if (data.notificationPurpose === "ITEM") {
            state.messages.push(data);
          } else {
            state.notifications.push(data);
          }
        }
        state.totalCount = totalCount;
        state.page = page;
        state.totalPage = Math.ceil(totalCount / 10);
      }
      return state;
    },
  },
});

export const { addAlert } = DashboardAlertSlice.actions;
export default DashboardAlertSlice;
