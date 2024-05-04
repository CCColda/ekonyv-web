import SiteSkeleton from "@/components/site_skeleton";

import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./login.module.scss";
import { StoreState } from "@/redux/store";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/data/api.login";
import sessionSlice from "@/redux/slices/session.slice";
import { Address } from "@/types/server";
import { UserCredentials } from "@/types/user";

function checkUsernameAndPassword(username: string, password: string) {
	return username.match(/[a-zA-Z0-9_\.]{4,32}/) && password.match(/[a-zA-Z0-9_\.\!\+\-\:\@\&\#]{4,32}/);
}

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const address = useSelector<StoreState, Address | null>(s => s.connection.address);

	const user = useSelector<StoreState, UserCredentials | null>(s => s.session.credentials);
	const router = useRouter();
	const dispatch = useDispatch();

	/* useEffect(() => {
		if (address == null)
			router.push("server");

		if (user != null)
			router.push("user");
	}, []); */

	const tryLogin = async () => {
		if (!checkUsernameAndPassword(username, password))
			return;

		const session = await login(address!, username, password);
		if (session == null)
			return;

		dispatch(sessionSlice.actions.setCredentials({ username, password }));
		dispatch(sessionSlice.actions.setSession(session));
		router.push("user");
	};

	return <SiteSkeleton title="EKönyv - Bejelentkezés" description="">
		<div className={styles.login}>
			<div className={styles.title}>
				<span> Bejelentkezés </span>
			</div>
			<div className={styles.credentials}>
				<table>
					<tbody className={styles.inputs}>
						<tr>
							<td>Felhasználónév</td>
							<td><input type="username" placeholder="konyves_kalman" onChange={v => setUsername(v.target.value)} /></td>
						</tr>
						<tr>
							<td>Jelszó</td>
							<td><input type="password" placeholder="•••••" onChange={v => setPassword(v.target.value)} /></td>
						</tr>
					</tbody>
				</table>
				<div className={styles.actions}>
					<button onClick={_ => tryLogin()}>Bejelentkezés</button>
					<Link href="register">Nincs fiókod? Regisztrálj</Link>
				</div>
			</div>
		</div>
	</SiteSkeleton>
}