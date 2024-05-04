import { checkAddress } from "@/data/api.status";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Address, ServerInfo } from "@/types/server";
import { Connection } from "./connection.slice";
import { checkSession, login, renew } from "@/data/api.login";
import { Session } from "@/types/session";
import { UserCredentials } from "@/types/user";

export type ApplicationState = {
	time_s: number,
	state: "initial" | "loaded"
};

const initialState: ApplicationState = {
	time_s: Date.now() / 1_000,
	state: "initial"
};

export type InitResponse = {
	connection: Connection,
	serverInfo: ServerInfo | null,
	session: Session | null
}

export type InitRequest = {
	address: Address,
	session: Session | null,
	credentials: UserCredentials | null
}

export const initThunk = createAsyncThunk<InitResponse, InitRequest>(
	"app/init",
	async (arg, thunk) => {
		try {
			const address_response = await checkAddress(arg.address);

			if (!address_response)
				return { connection: "not_connected", serverInfo: null, session: null };

			if (arg.session) {
				const session_response = await checkSession(arg.address, arg.session.token);

				if (!session_response) {
					const new_session = await renew(arg.address, arg.session.refresh_token);

					return { connection: "connected", serverInfo: address_response, session: new_session };
				}

				return { connection: "connected", serverInfo: address_response, session: arg.session };
			}

			if (arg.credentials) {
				const login_response = await login(arg.address, arg.credentials.username, arg.credentials.password);

				return { connection: "connected", serverInfo: address_response, session: login_response };
			}

			return { connection: "connected", serverInfo: address_response, session: null };
		}
		catch {
			return { connection: "not_connected", serverInfo: null, session: null };
		}
	}
);

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<ApplicationState["state"]>) => {
			state.state = action.payload;
		},
		updateTime: (state) => {
			state.time_s = Date.now() / 1_000;
		}
	},
	extraReducers: builder => {
		builder.addCase(initThunk.fulfilled, (state, action) => {
			state.state = "loaded";
		});
	}
});

export default appSlice;