import { configureStore } from "@reduxjs/toolkit";
import connectionSlice from "../slices/connection.slice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => configureStore({
	reducer: {
		connection: connectionSlice.reducer
	}
});

const storeWrapper = createWrapper(makeStore);

export type StoreType = ReturnType<typeof makeStore>;
export type StoreState = ReturnType<StoreType["getState"]>;
export type StoreDispatch = StoreType["dispatch"];

export default storeWrapper;
