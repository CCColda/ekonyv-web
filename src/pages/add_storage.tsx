import IconFileAdd from "@/icons/file-add";
import styles from "./add_storage.module.scss";
import { ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import Book from "@/types/book";
import { addBook } from "@/data/api.book";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/redux/store";
import { renew } from "@/data/api.login";
import sessionSlice from "@/redux/slices/session.slice";
import { Address } from "@/types/server";
import { Session } from "@/types/session";
import SiteSkeleton from "@/components/site_skeleton";
import { useRouter } from "next/router";
import Storage from "@/types/storage";
import { addStorage } from "@/data/api.storage";
import IconBxLayerPlus from "@/icons/bx-layer-plus";

const PLACEHOLDER_STORAGE = Object.freeze({
	name: "a rejtett polc"
});

const TextInputRow: React.FC<{ description: string, placeholder: string, value: string, setFunction: Dispatch<SetStateAction<string>> }> =
	({ description, placeholder, value, setFunction }) =>
		<tr className={styles.text_field}>
			<td>{description}</td>
			<td><input
				type="text"
				placeholder={placeholder}
				defaultValue={value}
				onChange={ev => setFunction(ev.target.value)} /></td>
		</tr>;

export default function AddBook() {
	const [name, setName] = useState("");
	const [requested, setRequested] = useState(false);

	const router = useRouter();
	const dispatch = useDispatch();
	const address = useSelector<StoreState, Address | null>(state => state.connection.address);
	const session = useSelector<StoreState, Session | null>(state => state.session.session);

	useEffect(() => {
		if (address == null)
			router.push("server");

		if (session == null)
			router.push("login");
	}, []);

	const add_storage: MouseEventHandler<HTMLButtonElement> = async (ev) => {
		if (session == null || address == null)
			return;

		setRequested(true);

		let currentSession = session;

		if (session.expire < (Date.now() / 1000)) {
			const newSession = await renew(address, session.refresh_token!);
			if (newSession == null)
				return;

			currentSession = newSession;
			dispatch(sessionSlice.actions.setSession(currentSession));
		}

		await addStorage(address, currentSession.token!, { name });

		setRequested(false);
	};
	return <SiteSkeleton title="EKönyv - Hely hozzáadása" description="">
		<div className={styles.add_storage}>
			<h1 className={styles.title}>
				<IconBxLayerPlus />
				<span>Hely hozzáadása</span>
			</h1>
			<table className={styles.table}>
				<tbody className={styles.data}>
					<TextInputRow value={name} description="Név" placeholder={PLACEHOLDER_STORAGE.name} setFunction={setName} />
				</tbody>
			</table>
			<button className={styles.add_button} disabled={requested} onClick={add_storage}>Hozzáadás</button>
		</div>
	</SiteSkeleton>
};