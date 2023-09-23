import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Address = {
	protocol: "http://" | "https://",
	ip: string,
	port: number
};

export type Connection =
	"no_ip" | "not_connected_retry" | "not_connected" | "connected";

export type ServerInfo = {
	name: string,
	version: string
};

export type ConnectionState = {
	address: Address,
	connection: Connection,
	serverInfo: ServerInfo | null
};

const initialState: ConnectionState = {
	address: { ip: "", port: 0, protocol: "http://" },
	connection: "no_ip",
	serverInfo: null
};

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
	}
});

export default connectionSlice;