import { EnhancedStore, combineReducers, configureStore } from "@reduxjs/toolkit";
import connectionSlice from "./slices/connection.slice";
import sessionSlice from "@/redux/slices/session.slice";
import bookSlice from "@/redux/slices/books.slice";
import storageSlice from "@/redux/slices/storages.slice";
import appSlice from "@/redux/slices/app.slice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createFilter } from 'redux-persist-transform-filter';
import uiSlice from "./slices/ui.slice";

const initStore = () => {
	const rootReducer = combineReducers({
		connection: connectionSlice.reducer,
		session: sessionSlice.reducer,
		storages: storageSlice.reducer,
		books: bookSlice.reducer,
		ui: uiSlice.reducer,
		app: appSlice.reducer
	});

	const connectionFilter = createFilter("connection", ["address"]);
	const uiFilter = createFilter("ui", ["navigationExpanded"]);

	const persistedReducer = persistReducer({
		key: "primary",
		storage,
		transforms: [connectionFilter, uiFilter],
		blacklist: ["app"]
	}, rootReducer);

	const store = configureStore({
		reducer: persistedReducer as typeof rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
				}
			})
	});
	const persistor = persistStore(store);

	return {
		store: store, persistor
	};
};


export type StoreType = ReturnType<typeof initStore>["store"];
export type StoreState = ReturnType<StoreType["getState"]>;
export type StoreDispatch = StoreType["dispatch"];

export default initStore;

