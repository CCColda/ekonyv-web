import { FC, useState } from "react";
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

const SiteNavigation: FC<{}> = props => {
	const [collapsed, setCollapsed] = useState(false);
	const status = useSelector<StoreState, Connection>(s => s.connection.connection);

	const navProps: NavigationProps = {
		topLinks: [{
			text: <span style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5em" }}>
				<span>Szerver</span>
				<StatusBadge status={status} hideText />
			</span>,
			action: "server",
			icon: <IconBxServer />
		}, {
			text: "Fiók",
			icon: <IconAccountBoxOutline />,
			disabled: status != "connected", //! @todo
			action() { },
		}, {
			text: "Könyvek",
			icon: <IconBxsBookHeart />,
			disabled: status != "connected", //! @todo
			action() {

			},
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