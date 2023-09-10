import IconCrossCircled from "@/icons/cross-circled";
import IconExclamationTriangleFill from "@/icons/exclamation-triangle-fill";
import IconTickCircle from "@/icons/tick-circle";
import { Connection } from "@/slices/connection.slice";
import { FC } from "react";

import styles from "./status_badge.module.scss";

export type StatusBadgeProps = {
	status: Connection,
	hideText?: boolean
};

const StatusBadge: FC<StatusBadgeProps> = ({ status, hideText }) => {
	const status_icon_map: Record<Connection, React.ReactNode> = {
		connected: <IconTickCircle />,
		not_connected_retry: <IconExclamationTriangleFill />,
		no_ip: <IconCrossCircled />,
		not_connected: <IconCrossCircled />
	};

	const status_text_map: Record<Connection, string> = {
		connected: "Csatlakoztatva",
		not_connected_retry: "Újracsatlakozás...",
		no_ip: "Nincs beállítva",
		not_connected: "Kapcsolat megszakadt",
	};

	const status_class_map: Record<Connection, string> = {
		connected: styles.status_connected,
		not_connected_retry: styles.status_not_connected_retry,
		no_ip: styles.status_no_ip,
		not_connected: styles.status_not_connected,
	};

	return <div className={[styles.status_badge, status_class_map[status]].join(' ')}>
		{status_icon_map[status]}
		{
			!hideText &&
			<span>{status_text_map[status]}</span>
		}
	</div>
};

export default StatusBadge;