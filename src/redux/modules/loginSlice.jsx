import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const API_SEATCH = process.env.REACT_APP_IP_ADDRESS;
const cookies = new Cookies();

const initialState = {
  login: [],
  search: []
}

export const __postSearch = createAsyncThunk("todos/postSearch", async (payload, thunkAPI) => {
  try {
    const authorization_token = cookies.get("Authorization");
    console.log('__postSearch=>',payload);
    const data = await axios.post(`${API_SEATCH}`, payload,{
      header:{
        Authorization: authorization_token
      }
    });
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const todosSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [__postSearch.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postSearch.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__postSearch.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const { } = todosSlice.actions;
export default todosSlice.reducer;