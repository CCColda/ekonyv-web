import { configureStore } from "@reduxjs/toolkit";
import connectionSlice from "../slices/connection.slice";
import { createWrapper } from "next-redux-wrapper";
import sessionSlice from "@/slices/session.slice";
import dialogSlice from "@/slices/dialog.slice";

const makeStore = () => configureStore({
	reducer: {
		connection: connectionSlice.reducer,
		session: sessionSlice.reducer,
		dialog: dialogSlice.reducer,
	}
});

const storeWrapper = createWrapper(makeStore);

export type StoreType = ReturnType<typeof makeStore>;
export type StoreState = ReturnType<StoreType["getState"]>;
export type StoreDispatch = StoreType["dispatch"];

export default storeWrapper;
