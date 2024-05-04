import IconFileAdd from "@/icons/file-add";
import styles from "./add_book.module.scss";
import { ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction, useEffect, useMemo, useState } from "react";
import Book, { PartialBook } from "@/types/book";
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

enum Flag {
	PUBLICLY_WRITABLE = 0b00000001,
	PUBLICLY_READABLE = 0b00000010,
	TEMPORARY = 0b00000100,
	BOOK = 0b00001000,
	PUBLICATION = 0b00010000,
};

const PLACEHOLDER_BOOK = Object.freeze({
	title: "The Social Contract",
	in: 9780141018881,
	authors: "Jean-Jacques Rousseau, ford. Maurice Cranston 1968",
	published: "1895, ford. 2004",
	attributes: "168 o., A5",
	flags: 0b00001010
});

const FLAG_INPUTS = Object.freeze([
	{
		description: "Nyilvánosan írható",
		flag: Flag.PUBLICLY_WRITABLE
	},
	{
		description: "Nyilvánosan megtekinthető",
		flag: Flag.PUBLICLY_READABLE
	},
	{
		description: "Könyv",
		flag: Flag.BOOK
	},
	{
		description: "Folyóirat",
		flag: Flag.PUBLICATION
	}
]);

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
	const [title, setTitle] = useState("");
	const [authors, setAuthors] = useState("");
	const [published, setPublished] = useState("");
	const [attributes, setAttributes] = useState("");
	const [IN, setIN] = useState("");
	const [storage, setStorage] = useState("default");
	const [flags, setFlags] = useState(0);
	const [requested, setRequested] = useState(false);

	const router = useRouter();
	const dispatch = useDispatch();
	const address = useSelector<StoreState, Address | null>(state => state.connection.address);
	const session = useSelector<StoreState, Session | null>(state => state.session.session);

	useEffect(() => {
		/* if (address == null)
			router.push("server");

		if (session == null)
			router.push("login"); */
	}, []);

	const StorageInputRow: React.FC<{}> = _ => {
		const registeredStorages = useSelector<StoreState, Storage[]>(state => state.storages);
		const availableStorages = useMemo<Storage[]>(() => ([{ id: 0, name: "Kiválasztás...", user_id: 0 }, ...registeredStorages]), [registeredStorages]);

		return <tr>
			<td>Hely</td>
			<td>
				<span className={styles.storage}>
					<select value={`${storage}`} onChange={ev => setStorage(ev.target.value)}>
						{/* <option value="0">Kiválasztás...</option> */}
						{
							availableStorages.map(storage =>
								<option value={`${storage.id}`} key={storage.id}>{storage.name}</option>
							)
						}
					</select>
				</span>
			</td>
		</tr>;
	}

	const FlagCheckbox: React.FC<{ description: string, flag: number }> =
		({ description, flag }) =>
			<span className={styles.flag}>
				<input
					type="checkbox"
					id={"flag_" + flag}
					defaultChecked={(flags & flag) != 0}
					onChange={ev => setFlags(flags => ev.target.checked ? flags | flag : flags & ~flag)} />
				<label htmlFor={"flag_" + flag}>{description}</label>
			</span>;

	const FlagInputRow: React.FC<{}> = _ =>
		<tr className={styles.flags}>
			<td>Jellemzők</td>
			<td>
				{
					FLAG_INPUTS.map(input => <FlagCheckbox {...input} key={`flag_${input.flag}`} />)
				}
			</td>
		</tr>;

	const add_book: MouseEventHandler<HTMLButtonElement> = async (ev) => {
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

		const book: PartialBook = {
			title,
			in: Number(IN),
			authors,
			published,
			attributes,
			flags,
			storage_id: Number(storage),
		};

		await addBook(address, currentSession.token!, book);
		setRequested(false);
	};
	return <SiteSkeleton title="EKönyv - Könyv hozzáadása" description="">
		<div className={styles.add_book}>
			<h1 className={styles.title}>
				<IconFileAdd />
				<span>Könyv hozzáadása</span>
			</h1>
			<table className={styles.table}>
				<tbody className={styles.data}>
					<TextInputRow value={title} description="Cím" placeholder={PLACEHOLDER_BOOK.title} setFunction={setTitle} />
					<TextInputRow value={authors} description="Szerző(k)" placeholder={PLACEHOLDER_BOOK.authors} setFunction={setAuthors} />
					<TextInputRow value={published} description="Kiadás" placeholder={PLACEHOLDER_BOOK.published} setFunction={setPublished} />
					<TextInputRow value={attributes} description="Fizikai jellemzők" placeholder={PLACEHOLDER_BOOK.attributes} setFunction={setAttributes} />
					<TextInputRow value={IN} description={(flags & Flag.PUBLICATION) != 0 ? "ISSN" : "ISBN"} placeholder={`${PLACEHOLDER_BOOK.in}`} setFunction={setIN} />
					<StorageInputRow />
					<FlagInputRow />
					<tr>
						<td>Jellemzők (bitek)</td>
						<td>{flags.toString(2).padStart(8, '0')}</td>
					</tr>
				</tbody>
			</table>
			<button className={styles.add_button} disabled={requested} onClick={add_book}>Hozzáadás</button>
		</div>
	</SiteSkeleton>
};