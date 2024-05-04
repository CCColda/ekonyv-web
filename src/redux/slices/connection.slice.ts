import { checkAddress } from "@/data/api.status";
import { Address, ServerInfo } from "@/types/server";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initThunk } from "./app.slice";

export type Connection =
	"no_ip" | "not_connected_retry" | "not_connected" | "connected";

export type ConnectionState = {
	address: Address | null,
	connection: Connection,
	serverInfo: ServerInfo | null
};

const initialState: ConnectionState = {
	address: null,
	connection: "no_ip",
	serverInfo: null
};

export type CheckConnectionResponse = {
	connection: Connection,
	serverInfo: ServerInfo | null
};

export const checkConnection = createAsyncThunk<CheckConnectionResponse, Address>(
	"connection/checkConnection",
	async (arg, thunk) => {
		try {
			const response = await checkAddress(arg);

			return { connection: response ? "connected" : "not_connected", serverInfo: response };
		}
		catch {
			return { connection: "not_connected", serverInfo: null };
		}
	}
);

const connectionSlice = createSlice({
	name: "connection",
	initialState,
	reducers: {
		setAddress: (state, action: PayloadAction<Address>) => {
			state.address = action.payload;
		},
		setConnection: (state, action: PayloadAction<Connection>) => {
			state.connection = action.payload;
		},
		setServerInfo: (state, action: PayloadAction<ServerInfo>) => {
			state.serverInfo = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(checkConnection.fulfilled, (state, action) => {
			state.connection = action.payload.connection;
			state.serverInfo = action.payload.serverInfo;
		});

		builder.addCase(initThunk.fulfilled, (state, action) => {
			state.connection = action.payload.connection;
			state.serverInfo = action.payload.serverInfo;
		});
	}
});

export default connectionSlice;