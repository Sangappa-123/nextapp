"use client";

import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import rootReducer from "@/store/reducers";
import { Provider } from "react-redux";
const store = configureStore({ reducer: rootReducer });

export default store;

export function StoreProvider({ children }: { children: React.ReactNode }){
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
