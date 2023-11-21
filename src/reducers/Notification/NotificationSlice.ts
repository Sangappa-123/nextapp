import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

interface message {
  message: string;
  id: string;
  status?: string;
  position?: string;
}
export type NotifyType = message[];

const initVal: NotifyType = [];

const NotificationSlice = createSlice({
  initialState: initVal,
  name: "notify",
  reducers: {
    addNotification(state, action) {
      state = [action.payload];
      return state;
    },
    removeNotification(state, action) {
      return state.filter((data) => data?.id !== action.payload);
    },
    removeAllNotification() {
      return [];
    },
  },
});

export default NotificationSlice;

export const { addNotification, removeNotification, removeAllNotification } =
  NotificationSlice.actions;
