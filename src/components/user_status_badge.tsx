import IconCrossCircled from "@/icons/cross-circled";
import IconExclamationTriangleFill from "@/icons/exclamation-triangle-fill";
import IconTickCircle from "@/icons/tick-circle";
import { FC } from "react";

import styles from "./user_status_badge.module.scss";

export type UserStatus = "logged_in" | "expired_session" | "logged_out";

export type UserStatusBadgeProps = {
	status: UserStatus
};

const UserStatusBadge: FC<UserStatusBadgeProps> = ({ status }) => {
	const status_icon_map: Record<UserStatus, React.ReactNode> = {
		logged_in: <IconTickCircle />,
		expired_session: <IconExclamationTriangleFill />,
		logged_out: <IconCrossCircled />
	};

	const status_class_map: Record<UserStatus, string> = {
		logged_in: styles.status_logged_in,
		expired_session: styles.status_expired_session,
		logged_out: styles.status_logged_out,
	};

	return <div className={[styles.user_status_badge, status_class_map[status]].join(' ')}>
		{status_icon_map[status]}
	</div>
};

export default UserStatusBadge;