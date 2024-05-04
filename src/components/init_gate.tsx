import appSlice, { ApplicationState, initThunk } from "@/redux/slices/app.slice";
import { checkConnection } from "@/redux/slices/connection.slice";
import { StoreState } from "@/redux/store";
import { Address } from "@/types/server";
import { Session } from "@/types/session";
import { UserCredentials } from "@/types/user";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const InitGate: React.FC<React.PropsWithChildren<{ loading?: ReactNode }>> = props => {
	const dispatch = useDispatch();
	const server_state = useSelector<StoreState, ApplicationState["state"]>(s => s.app.state);
	const server_address = useSelector<StoreState, Address | null>(s => s.connection.address);
	const credentials = useSelector<StoreState, UserCredentials | null>(s => s.session.credentials);
	const session = useSelector<StoreState, Session | null>(s => s.session.session);

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(appSlice.actions.updateTime());
		}, 5_000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (server_state == "loaded")
			return;

		if (server_address)
			dispatch(initThunk({ address: server_address, credentials, session }) as any);
		else
			dispatch(appSlice.actions.setState("loaded"));
	}, [server_state]);

	return server_state == "initial" ? props.loading : props.children;
};

export default InitGate;