import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";

import bookReducer from "./reducers/book.reducer";
import loanReducer from "./reducers/loan.reducer";
import counterReducer from "./reducers/counter.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookReducer: bookReducer,
    loanReducer: loanReducer,
    counterReducer: counterReducer,
  },
});