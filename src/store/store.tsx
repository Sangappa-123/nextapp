"use client"

import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import dashboardSlice from "./reducers/dashboardSlice";

const store = configureStore({reducer: {'dasboard': dashboardSlice}});

export default store;

export const StoreProvider = ({children}:{children:React.ReactNode}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}