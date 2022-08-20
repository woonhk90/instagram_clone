import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  login: [],
}

export const todosSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const { } = todosSlice.actions;
export default todosSlice.reducer;