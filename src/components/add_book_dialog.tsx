import IconFileAdd from "@/icons/file-add";
import styles from "./add_book_dialog.module.scss";
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";
import Book from "@/types/book";
import { addBook } from "@/data/api.book";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/store/store";
import { Address } from "@/slices/connection.slice";
import { renew } from "@/data/api.login";
import sessionSlice, { SessionState } from "@/slices/session.slice";
import dialogSlice from "@/slices/dialog.slice";

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

const AddBookDialog: React.FC<{}> = (props) => {
	const [title, setTitle] = useState("");
	const [authors, setAuthors] = useState("");
	const [published, setPublished] = useState("");
	const [attributes, setAttributes] = useState("");
	const [IN, setIN] = useState("");
	const [storage, setStorage] = useState("default");
	const [flags, setFlags] = useState(0);
	const [requested, setRequested] = useState(false);

	const dispatch = useDispatch();
	const address = useSelector<StoreState, Address>(state => state.connection.address);
	const session = useSelector<StoreState, SessionState>(state => state.session);

	const setStorageOnChange: ChangeEventHandler<HTMLSelectElement> = ev => setStorage(ev.target.value);

	const TextInputRow: React.FC<{ description: string, placeholder: string, setFunction: Dispatch<SetStateAction<string>> }> =
		({ description, placeholder, setFunction }) =>
			<tr className={styles.text_field}>
				<td>{description}</td>
				<td><input type="text" placeholder={placeholder} onChange={ev => setFunction(ev.target.value)} /></td>
			</tr>;

	const StorageInputRow: React.FC<{}> = _ =>
		<tr>
			<td>Hely</td>
			<td>
				<span className={styles.storage}>
					<select defaultValue="default" onChange={setStorageOnChange}>
						<option value="default">Kiválasztás...</option>
					</select>
				</span>
			</td>
		</tr>;

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

	return <dialog open className={styles.add_book_dialog} onClick={e => e.stopPropagation()}>
		<h1 className={styles.title}>
			<IconFileAdd />
			<span>Könyv hozzáadása</span>
		</h1>
		<table className={styles.table}>
			<tbody className={styles.data}>
				<TextInputRow description="Cím" placeholder={PLACEHOLDER_BOOK.title} setFunction={setTitle} />
				<TextInputRow description="Szerző(k)" placeholder={PLACEHOLDER_BOOK.authors} setFunction={setAuthors} />
				<TextInputRow description="Kiadás" placeholder={PLACEHOLDER_BOOK.published} setFunction={setPublished} />
				<TextInputRow description="Fizikai jellemzők" placeholder={PLACEHOLDER_BOOK.attributes} setFunction={setAttributes} />
				<TextInputRow description={(flags & Flag.PUBLICATION) != 0 ? "ISSN" : "ISBN"} placeholder={`${PLACEHOLDER_BOOK.in}`} setFunction={setIN} />
				<StorageInputRow />
				<FlagInputRow />
				<tr>
					<td>Jellemzők (bitek)</td>
					<td>{flags.toString(2).padStart(8, '0')}</td>
				</tr>
			</tbody>
		</table>
		<button disabled={requested} onClick={async (ev) => {
			if (session.expire == null)
				return;

			setRequested(true);

			let currentSession = session;

			if (session.expire < Date.now()) {
				currentSession = await renew(address, session.refresh_token!);
				dispatch(sessionSlice.actions.setTokens(currentSession));
			}

			const book: Book = {
				title,
				in: Number(IN),
				authors,
				published,
				attributes,
				flags,
				created: Date.now(),
				id: 0,
				storage_id: 0,
				user_id: 0
			};

			await addBook(address, currentSession.token!, book);
			setRequested(false);

			dispatch(dialogSlice.actions.setDialogShown(false));
		}}>Hozzáadás</button>
	</dialog>
};

export default AddBookDialog;