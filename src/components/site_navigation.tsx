import { FC, useEffect, useMemo, useState } from "react";
import Navigation, { NavigationProps } from "./navigation";
import IconBxServer from "@/icons/bx-server";
import IconAccountBoxOutline from "@/icons/account-box-outline";
import IconQrCode from "@/icons/qr-code";
import IconBxsBookHeart from "@/icons/bxs-book-heart";
import IconBookshelf from "@/icons/bookshelf";
import IconFileAdd from "@/icons/file-add";
import StatusBadge from "./status_badge";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/store";
import { Connection } from "@/slices/connection.slice";
import UserStatusBadge, { UserStatus } from "./user_status_badge";
import { SessionState } from "@/slices/session.slice";

const SESSION_UPDATE_INTERVAL = 15_000;

const SiteNavigation: FC<{}> = props => {
	const [collapsed, setCollapsed] = useState(false);
	const status = useSelector<StoreState, Connection>(s => s.connection.connection);

	const [time, setTime] = useState(Date.now() / 1000);

	const session = useSelector<StoreState, SessionState>(s => s.session);

	useEffect(() => {
		const interval_cb = () => {
			setTime(Date.now() / 1000);
		};

		const interval = setInterval(interval_cb, SESSION_UPDATE_INTERVAL);
		return () => clearInterval(interval);
	}, []);

	const userStatus = useMemo<UserStatus>(() => session.expire == null ? "logged_out" : (session.expire < time ? "expired_session" : "logged_in"), [time, session]);

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
			disabled: false,//status != "connected", //! @todo
			action: "/user",
		}, {
			text: "Könyvek",
			icon: <IconBxsBookHeart />,
			disabled: false, //status != "connected", //! @todo
			action: "books"
		}, {
			text: "Helyek",
			icon: <IconBookshelf />,
			disabled: status != "connected", //! @todo
			action() {

			},
		}],
		bottomLinks: [{
			text: "Könyv hozzáadása",
			disabled: status != "connected", //! @todo
			icon: <IconFileAdd />,
			action() {

			},
		}, {
			text: "QR szkennelése",
			disabled: status != "connected", //! @todo
			action() { },
			icon: <IconQrCode />
		}],
		collapsed,
		setCollapsed
	}

	return <Navigation {...navProps} />;
};

export default SiteNavigation;