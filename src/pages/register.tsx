import SiteSkeleton from "@/components/site_skeleton";
import { useMemo, useState } from "react";
import { passwordStrength } from "check-password-strength";

import styles from "./register.module.scss";
import { register, requestCode } from "@/data/api.register";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/store/store";
import { Address } from "@/slices/connection.slice";
import { login } from "@/data/api.login";
import { useRouter } from "next/router";
import sessionSlice from "@/slices/session.slice";
import loginSlice from "@/slices/login.slice";
import Link from "next/link";

type PasswordStrengthCode = 0 | 1 | 2 | 3;

function checkUsernameAndPassword(username: string, password: string) {
	return username.match(/[a-zA-Z0-9_\.]{4,32}/) && password.match(/[a-zA-Z0-9_\.\!\+\-\:\@\&\#]{4,32}/);
}

function checkCode(code: string) {
	return code.match(/[a-zA-Z0-9]{4}/);
}

export default function Register() {
	const pw_strength_styles: Record<PasswordStrengthCode, string> = {
		0: styles.too_weak,
		1: styles.weak,
		2: styles.medium,
		3: styles.strong
	};

	const pw_strength_strings: Record<PasswordStrengthCode, string> = {
		0: "Nagyon gyenge",
		1: "Gyenge",
		2: "Közepes",
		3: "Erős"
	};

	const address = useSelector<StoreState, Address>(s => s.connection.address);
	const router = useRouter();
	const dispatch = useDispatch();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [code, setCode] = useState("");

	const [codeRequested, setCodeRequested] = useState(false);

	const strength = useMemo(() => passwordStrength(password), [password]);

	const matching = useMemo(() => password == passwordRepeat && password.length > 0, [password, passwordRepeat]);

	const tryReqCode = async () => {
		if (!checkUsernameAndPassword(username, password))
			return;

		if (!await requestCode(address))
			return;

		setCodeRequested(true);
	}

	const tryRegister = async () => {
		if (!checkCode(code))
			return;

		const [success, reason] = await register(address, username, password, code);

		if (!success)
			return;

		dispatch(loginSlice.actions.setCredentials({ username, password }));

		const session = await login(address, username, password);
		if (session.expire == null)
			return;

		dispatch(sessionSlice.actions.setTokens(session));
		router.push("user");
	}

	return <SiteSkeleton title="EKönyv - fiók" description="">
		<div className={styles.register}>
			<div className={styles.title}>
				<span> Regisztráció </span>
			</div>
			<div className={styles.new_user}>
				<table>
					<tbody className={styles.inputs}>
						<tr>
							<td>Felhasználónév</td>
							<td><input type="username" placeholder="konyves_kalman" onChange={v => setUsername(v.target.value)} disabled={codeRequested} /></td>
						</tr>
						<tr>
							<td>Jelszó</td>
							<td><input type="password" placeholder="•••••" onChange={v => setPassword(v.target.value)} disabled={codeRequested} /></td>
						</tr>
						{
							(password.length > 0 && !codeRequested) &&
							<tr className={[styles.strength, pw_strength_styles[strength.id as PasswordStrengthCode]].join(" ")}>
								<td>Erősség</td>
								<td>
									{pw_strength_strings[strength.id as PasswordStrengthCode]}
								</td>
							</tr>
						}
						<tr>
							<td>Jelszó újra</td>
							<td><input className={[styles.repeat, matching && styles.matching].join(" ")} type="password" placeholder="•••••" onChange={v => setPasswordRepeat(v.target.value)} disabled={codeRequested} /></td>
						</tr>
						{
							codeRequested &&
							<tr>
								<td>Kód</td>
								<td><input minLength={0} maxLength={4} type="text" placeholder="kód" onChange={v => setCode(v.target.value)} /></td>
							</tr>
						}
					</tbody>
				</table>
				<div className={styles.actions}>
					<button onClick={_ => { tryReqCode() }} disabled={codeRequested}>Kód kérése</button>
					<button onClick={_ => { tryRegister() }} disabled={!codeRequested}>Regisztráció</button>
					<Link href="user">Van fiókod? Jelentkezz be</Link>
				</div>
			</div>
		</div>
	</SiteSkeleton>
}