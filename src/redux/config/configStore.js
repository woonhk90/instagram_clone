import { configureStore } from "@reduxjs/toolkit";
import login from '../modules/loginSlice'
import main from '../modules/mainSlice'

export const store = configureStore({
  reducer: {
    login,
    main
  },
});
