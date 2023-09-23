import SiteSkeleton from "@/components/site_skeleton";

import styles from "./user.module.scss";
import { useState } from "react";
import Link from "next/link";

export default function User() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return <SiteSkeleton title="EKönyv - fiók" description="">
		<div className={styles.set_server}>
			<div className={styles.title}>
				<span> Felhasználói adatok </span>
			</div>
			<div className={styles.new_ip}>
				<span>Bejelentkezési adatok módosítása</span>
				<div className={styles.new_ip_input}>
					<input type="username" placeholder="konyves_kalman" onChange={v => setUsername(v.target.value)}></input>
					<input type="password" placeholder="jelszo" onChange={v => setPassword(v.target.value)}></input>
				</div>
				<div className={styles.new_ip_action}>
					<button onClick={_ => { }} disabled={false}>Bejelentkezés</button>
					<Link href="register">Nincs fiókod? Regisztrálj</Link>
				</div>
			</div>
		</div>
	</SiteSkeleton>
}