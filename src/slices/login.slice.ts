import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type LoginState = {
	username: string | null,
	password: string | null
};

const initialState: LoginState = {
	username: null,
	password: null
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<LoginState>) => {
			state.username = action.payload.username;
			state.password = action.payload.password;
		}
	}
});

export default loginSlice;