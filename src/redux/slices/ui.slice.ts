import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type RibbonState = {
	type: "error" | "warning" | "info",
	message: string,
	expire: number | null
};

export type UIState = {
	navigationExpanded: boolean,
	ribbon: null | RibbonState
};

const initialState: UIState = {
	navigationExpanded: false,
	ribbon: null
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setNavigationExpanded: (state, action: PayloadAction<boolean>) => {
			state.navigationExpanded = action.payload;
		},
		setRibbon: (state, action: PayloadAction<RibbonState>) => {
			state.ribbon = action.payload;
		},
		clearRibbon: (state) => {
			state.ribbon = null;
		}
	}
});

export default uiSlice;