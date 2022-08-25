import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const API_SEATCH = process.env.REACT_APP_IP_ADDRESS;
const cookies = new Cookies();

const initialState = {
    res: [],
    cards: [],
    cardList: [],
    isLoading: false,
}

// const refresh_token = cookies.get("Authorization");
export const __postForm = createAsyncThunk("todos/postForm", async (payload, thunkAPI) => {
    try {
        const authorization_token = cookies.get("Authorization");
        // const data = await axios.post(`http://localhost:3001/cards`, payload);
        const data = await axios.post(`${API_SEATCH}/article/auth`, payload, {
            headers: {
                'Content-type': 'multipart/form-data',
                responseType: 'blob',
                Authorization: authorization_token
            },
        });
        console.log('data=>', data);
        thunkAPI.dispatch(__getCardInfo());
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const __getCardInfo = createAsyncThunk("todos/__getCardInfo", async (payload, thunkAPI) => {
    try {
        console.log('__getCardInfo=>');
        const authorization_token = cookies.get("Authorization");
        // const data = await axios.get(`http://localhost:3001/cards`);
        const data = await axios.get(`${API_SEATCH}/article/auth`, {
            headers: {
                Authorization: authorization_token
            },
        });
        console.log('__getCardInfo=>', data);
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const __postLike = createAsyncThunk("todos/postLike", async (payload, thunkAPI) => {
    try {
        console.log('__postLike=>', payload);
        const authorization_token = cookies.get("Authorization");
        const data = await axios.patch(`${API_SEATCH}/article/auth/heart/${payload.cardNum}`, payload, {
            headers: {
                Authorization: authorization_token
            },
        });
        console.log('좋아요버튼의data=>', data);
        thunkAPI.dispatch(__getCardInfo());
        // return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        // return thunkAPI.rejectWithValue(error);
    }
});

export const __postCardDelete = createAsyncThunk("todos/postCardDelete", async (payload, thunkAPI) => {
    try {
        console.log('__postCardDelete1=>', payload);
        const authorization_token = cookies.get("Authorization");
        // const data = await axios.post(`http://localhost:3001/cards`, payload);
        const data = await axios.delete(`${API_SEATCH}/article/auth/${payload.id}`, {
            headers: {
                Authorization: authorization_token
            },
        });
        console.log('data=>', data);
        // thunkAPI.dispatch(__getCardInfo());
        return thunkAPI.fulfillWithValue(payload.id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postCardUpdate = createAsyncThunk("todos/postCardUpdate", async (payload, thunkAPI) => {
    try {
        console.log('__postCardUpdate=>', payload);
        const authorization_token = cookies.get("Authorization");
        console.log('__postCardUpdate=>', authorization_token);
        const data = await axios.patch(`${API_SEATCH}/article/auth/${payload.id}`, payload, {
            headers: {
                Authorization: authorization_token
            },
        });
        console.log('data=>', data);
        //서버에서 한번 더 하는게 괜ㅊ
        thunkAPI.dispatch(__getCardInfo());
        // return thunkAPI.fulfillWithValue(payload.id);
    } catch (error) {
        // return thunkAPI.rejectWithValue(error);
    }
});


export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {},
    extraReducers: {
        [__postForm.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__postForm.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            // console.log('1====>',state);
            console.log('2====>', action);
            console.log('2====>', action.payload);
            // state.cards.unshift(action.payload)
        },
        [__postForm.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        [__getCardInfo.pending]: (state) => {
            state.isLoading = true;
        },
        [__getCardInfo.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log(state);
            console.log(action);
            state.cards = action.payload;
        },
        [__getCardInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [__postCardDelete.pending]: (state) => {
            state.isLoading = true;
        },
        [__postCardDelete.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log('__postCardDelete2=>', state);
            console.log('__postCardDelete4=>', action);
            state.cards = state.cards.filter((card) => card.id !== action.payload)
        },
        [__postCardDelete.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { } = mainSlice.actions;
export default mainSlice.reducer;