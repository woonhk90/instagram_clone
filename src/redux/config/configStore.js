import { configureStore } from "@reduxjs/toolkit";
import login from '../modules/loginSlice'

export const store = configureStore({
  reducer: {
    login
  },
});
