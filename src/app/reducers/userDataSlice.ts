import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

export enum UserDataStatus {
    IDLE,
    LOADING,
    SUCCESS,
    ERROR
}

export interface UserData {
    data: any; // TODO: ADD INTERFACE FOR USER DATA
    status: UserDataStatus;
    error: string | undefined;
}

const initialState: UserData = {
    data: null,
    status: UserDataStatus.IDLE,
    error: "",
};

export const fetchUserData = createAsyncThunk("fetchUserData", async () => {
    let fetch_obj = await fetch("/api/user/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return await fetch_obj.json()
});

export const userDataSlice = createSlice({
    name: "userDataSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUserData.pending, (state, action) => {
                state.status = UserDataStatus.LOADING;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = UserDataStatus.SUCCESS;
                state.data = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = UserDataStatus.ERROR;
                state.error = action.error.message;
            });
    },
});

export const userDataSelector = (state: RootState) => state.user.data;
export const userStatusSelector = (state: RootState) => state.user.status;
export const userErrorSelector = (state: RootState) => state.user.error;

export default userDataSlice.reducer;