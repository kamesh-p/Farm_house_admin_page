import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import { orderReducer } from "./Order-slice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    order: orderReducer,
  },
});
export default store;
