"use client"

import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import rootReducer from "@/store/reducers";
import { Provider } from "react-redux";
const store = configureStore({ reducer: rootReducer });

export default store;

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}