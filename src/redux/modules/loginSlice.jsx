import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export function setRefreshTokenToCookie(key, data) {
  // let now = new Date();
  // now.setMinutes(now.getMinutes() + 30);
  // cookies.set("Authorization", data, { path: "/", expires: now });
  cookies.set(key, data, { path: "/" });
}

const API_SEATCH = process.env.REACT_APP_IP_ADDRESS;
const cookies = new Cookies();

const initialState = {
  loginInfo: {},
  search: [],
  isLogin: false
}

export const __postLogin = createAsyncThunk("todos/__postLogin", async (payload, thunkAPI) => {
  try {
    console.log('__postLogin=>>');
    const data = await axios.post(
      `${process.env.REACT_APP_IP_ADDRESS}/member/login`,
      payload,
      {
        headers: {},
      }
    );
    console.log("로그인성공데이터1:", data.data);
    const token = data.headers.authorization;
    setRefreshTokenToCookie("Authorization", token);

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log("LoginERROR=>", error);
    window.alert(error.response.data.errorMessage);
    return ;
  }
});


export const todosSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getUser: (state, action) => {
      console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ1:", action.payload);
      (action.payload = {
        isLogin: cookies.get("Authorization") ? true : false,
      })
      console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ2:", action.payload);
    }
  },
  extraReducers: {
    [__postLogin.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postLogin.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.loginInfo = action.payload;
      state.isLogin = cookies.get('Authorization') ? true : false;
      console.log('__postLogin 의 state.isLogin', state.isLogin);
    },
    [__postLogin.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    // [__postSearch.pending]: (state) => {
    //   state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    // },
    // [__postSearch.fulfilled]: (state, action) => {
    //   state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    // },
    // [__postSearch.rejected]: (state, action) => {
    //   state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    // },
  },
});

export const { getUser } = todosSlice.actions;
export default todosSlice.reducer;