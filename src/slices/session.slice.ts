import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SessionState = {
	token: string | null,
	refresh_token: string | null,
	expire: number | null
};

const initialState: SessionState = {
	token: null,
	refresh_token: null,
	expire: null
};

const sessionSlice = createSlice({
	name: "session",
	initialState,
	reducers: {
		setTokens: (state, action: PayloadAction<SessionState>) => {
			state.token = action.payload.token;
			state.refresh_token = action.payload.refresh_token;
			state.expire = action.payload.expire;
		}
	}
});

export default sessionSlice;