import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReducerAction } from "react";

export type Address = {
	ip: string,
	port: number
};

export type Connection =
	"no_ip" | "not_connected_retry" | "not_connected" | "connected";

export type ConnectionState = {
	address: Address,
	connection: Connection
};

const initialState: ConnectionState = {
	address: { ip: "", port: 0 },
	connection: "no_ip"
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
		}
	}
});

export default connectionSlice;