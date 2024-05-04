import { FC, useEffect, useMemo, useState } from "react";
import Navigation, { NavigationProps } from "./navigation";
import IconBxServer from "@/icons/bx-server";
import IconAccountBoxOutline from "@/icons/account-box-outline";
import IconQrCode from "@/icons/qr-code";
import IconBxsBookHeart from "@/icons/bxs-book-heart";
import IconBookshelf from "@/icons/bookshelf";
import IconFileAdd from "@/icons/file-add";
import StatusBadge from "./status_badge";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/redux/store";
import { Connection } from "@/redux/slices/connection.slice";
import UserStatusBadge, { UserStatus } from "./user_status_badge";
import { SessionState } from "@/redux/slices/session.slice";
import { Session } from "@/types/session";
import uiSlice from "@/redux/slices/ui.slice";
import IconBxLayerPlus from "@/icons/bx-layer-plus";

const SESSION_UPDATE_INTERVAL = 15_000;

const SiteNavigation: FC<{}> = props => {
	const collapsed = useSelector<StoreState, boolean>(s => s.ui.navigationExpanded);
	const status = useSelector<StoreState, Connection>(s => s.connection.connection);

	const [time, setTime] = useState(Date.now() / 1000);

	const session = useSelector<StoreState, Session | null>(s => s.session.session);

	useEffect(() => {
		const interval_cb = () => {
			setTime(Date.now() / 1000);
		};

		const interval = setInterval(interval_cb, SESSION_UPDATE_INTERVAL);
		return () => clearInterval(interval);
	}, []);

	const userStatus = useMemo<UserStatus>(() => session == null ? "logged_out" : (session.expire < time ? "expired_session" : "logged_in"), [time, session]);

	const dispatch = useDispatch();
	const setCollapsed = (collapsed: boolean) => dispatch(uiSlice.actions.setNavigationExpanded(collapsed));

	const navProps: NavigationProps = {
		topLinks: [{
			text: <span style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5em" }}>
				<span>Szerver</span>
				<StatusBadge status={status} hideText />
			</span>,
			action: "server",
			icon: <IconBxServer />
		}, {
			text: <span style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5em" }}>
				<span>Fiók</span>
				<UserStatusBadge status={userStatus} />
			</span>,
			icon: <IconAccountBoxOutline />,
			disabled: status != "connected", //! @todo
			action: "/user",
		}, {
			text: "Könyvek",
			icon: <IconBxsBookHeart />,
			disabled: status != "connected" || userStatus != "logged_in", //! @todo
			action: "books"
		}, {
			text: "Helyek",
			icon: <IconBookshelf />,
			disabled: status != "connected" || userStatus != "logged_in", //! @todo
			action: "storages",
		}],
		bottomLinks: [
			{
				text: "Hely hozzáadása",
				disabled: status != "connected" || userStatus != "logged_in", //! @todo
				icon: <IconBxLayerPlus />,
				action: "add_storage",
			}, {
				text: "Könyv hozzáadása",
				disabled: status != "connected" || userStatus != "logged_in", //! @todo
				icon: <IconFileAdd />,
				action: "add_book",
			}],
		collapsed,
		setCollapsed
	}

	return <Navigation {...navProps} />;
};

export default SiteNavigation;