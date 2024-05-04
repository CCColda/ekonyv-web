import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Session } from "@/types/session";
import { UserCredentials } from "@/types/user";
import { initThunk } from "./app.slice";

export type SessionState = {
	session: Session | null
	credentials: UserCredentials | null
}

const initialState: SessionState = {
	session: null,
	credentials: null,
};

const sessionSlice = createSlice({
	name: "session",
	initialState,
	reducers: {
		setSession: (state, action: PayloadAction<Session>) => {
			state.session = action.payload;
		},
		setCredentials: (state, action: PayloadAction<UserCredentials>) => {
			state.credentials = action.payload;
		},
		clearCredentials: (state) => {
			state.credentials = null;
		}
	},
	extraReducers: builder => {
		builder.addCase(initThunk.fulfilled, (state, action) => {
			state.session = action.payload.session;
		});
	}
});

export default sessionSlice;