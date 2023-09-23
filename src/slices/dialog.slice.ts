import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DialogState = {
	shown: boolean
};

const initialState: DialogState = {
	shown: true
};

const dialogSlice = createSlice({
	name: "dialog",
	initialState,
	reducers: {
		setDialogShown: (state, action: PayloadAction<boolean>) => {
			state.shown = action.payload
		}
	}
});

export default dialogSlice;