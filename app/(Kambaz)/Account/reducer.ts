
import { createSlice } from "@reduxjs/toolkit";

type User = {
    _id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
} | null;

const initialState: { currentUser: User } = {
    currentUser: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, { payload }: { payload: User }) => {
            state.currentUser = payload ?? null;
        },
    },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
