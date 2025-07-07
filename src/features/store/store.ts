import { configureStore } from "@reduxjs/toolkit";
import transactionsSLice from "../transactions/transactionsSlice";
import userSlice from "../user/userSlice";
import limitsSlice from "../limits/limitsSlice";

export const store = configureStore({
    reducer:{
        transactions: transactionsSLice,
        users: userSlice,
        limits: limitsSlice,
    },
    devTools:true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;