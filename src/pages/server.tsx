import SiteSkeleton from "@/components/site_skeleton";

import styles from "./server.module.scss";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/store";
import { Address, Connection } from "@/slices/connection.slice";
import StatusBadge from "@/components/status_badge";
import { useMemo } from "react";

export default function Server() {
	const status = useSelector<StoreState, Connection>(s => s.connection.connection);
	const ip = useSelector<StoreState, Address>(s => s.connection.address);

	const displayIP = useMemo(() => ip.ip == "" ? "<üres>" : `${ip.ip}:${ip.port}`, [ip]);

	return <SiteSkeleton title="EKönyv - szerver" description="">
		<div className={styles.server_data}>
			<div className={styles.server_status}>
				<span>A szerver státusza:</span>
				<StatusBadge status={status} />
			</div>
			<div className={styles.server_ip}>
				<span>Beállított IP-cím:</span>
				<span>{displayIP}</span>
			</div>
		</div>
		
	</SiteSkeleton>
}