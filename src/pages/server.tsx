import SiteSkeleton from "@/components/site_skeleton";

import styles from "./server.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/store/store";
import connectionSlice, { Address, Connection, ServerInfo } from "@/slices/connection.slice";
import StatusBadge from "@/components/status_badge";
import { useMemo, useState } from "react";
import { checkAddress } from "@/data/api.status";


export default function Server() {
	const dispatch = useDispatch();
	const status = useSelector<StoreState, Connection>(s => s.connection.connection);
	const ip = useSelector<StoreState, Address>(s => s.connection.address);
	const serverInfo = useSelector<StoreState, ServerInfo | null>(s => s.connection.serverInfo);

	const displayIP = useMemo(() => ip.ip == "" ? "<üres>" : `${ip.ip}:${ip.port}`, [ip]);

	const [localIP, setLocalIP] = useState("");
	const [localPort, setLocalPort] = useState(0);
	const [localProto, setLocalProto] = useState<Address["protocol"]>("http://");

	const localAddress = useMemo<Address>(() => ({ ip: localIP, port: localPort, protocol: localProto }), [localIP, localPort, localProto]);

	const [checkingServer, setCheckingServer] = useState(false);

	const checkServerAddress = async (addr: Address) => {
		setCheckingServer(true);
		const info = await checkAddress(addr);

		if (!info) {
			setCheckingServer(false);
			return;
		}

		dispatch(connectionSlice.actions.setAddress(addr));
		dispatch(connectionSlice.actions.setConnection("connected"));
		dispatch(connectionSlice.actions.setServerInfo(info));
		setCheckingServer(false);
	}

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
			{
				status == "connected" &&
				<>
					<div className={styles.server_name}>
						<span>Szerver neve:</span>
						<span>{serverInfo!.name}</span>
					</div>
					<div className={styles.server_version}>
						<span>Verzió:</span>
						<span>{serverInfo!.version}</span>
					</div>
				</>
			}
		</div>
		<div className={styles.set_server}>
			<div className={styles.title}>
				<span> Szerver beállítása </span>
			</div>
			<div className={styles.new_ip}>
				<span>Új IP-cím beállítása</span>
				<div className={styles.new_ip_input}>
					<select defaultValue={"http://"}>
						<option value="https://">HTTPS</option>
						<option value="http://">HTTP</option>
					</select>
					<input type="url" placeholder="IP-cím..." onChange={v => setLocalIP(v.target.value)}></input>
					<span>{":"}</span>
					<input type="number" placeholder="00000" onChange={v => setLocalPort(v.target.valueAsNumber)}></input>
				</div>
				<div className={styles.new_ip_action}>
					<button onClick={_ => checkServerAddress(localAddress)} disabled={checkingServer}>Ellenőrzés</button>
				</div>
			</div>
		</div>
	</SiteSkeleton>
}