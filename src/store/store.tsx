"use client";

import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import rootReducer from "@/reducers";
import { Provider } from "react-redux";
import { updateLoadingState } from "@/reducers/Session/SessionSlice";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export function StoreProvider({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  if (typeof window !== "undefined" && window.localStorage.getItem("lang") !== lang) {
    window.localStorage.setItem("lang", lang);
  }
  store.dispatch(updateLoadingState({ lang: lang }));
  return <Provider store={store}>{children}</Provider>;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
