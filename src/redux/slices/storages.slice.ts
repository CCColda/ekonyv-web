import { getAllStorages } from "@/data/api.storage";
import { Address } from "@/types/server";
import { Session } from "@/types/session";
import Storage from "@/types/storage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type LoadAllStoragesRequest = {
	address: Address,
	session: Session
};

const initialState: Storage[] = [];

export const loadAllStorages = createAsyncThunk<Storage[], LoadAllStoragesRequest>("storages/loadAll", async (arg, thunk) => {
	const storages = await getAllStorages(arg.address, arg.session.token);

	return storages ?? [];
});

const storageSlice = createSlice({
	name: "storages",
	initialState,
	reducers: {
		addStorage: (state, action: PayloadAction<Storage>) => {
			if (!state.some(v => v.id == action.payload.id))
				state.push(action.payload);
		},
		clearBooks: (state) => {
			state = [];
		}
	},
	extraReducers: builder => {
		builder.addCase(loadAllStorages.fulfilled, (state, action) => {
			action.payload.forEach(storage => {
				if (!state.some(v => v.id == storage.id))
					state.push(storage);
			});
		});
	}
});

export default storageSlice;
