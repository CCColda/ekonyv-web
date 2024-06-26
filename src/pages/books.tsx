import SiteSkeleton from "@/components/site_skeleton";
import styles from "./books.module.scss";
import Book from "@/types/book";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/redux/store";
import { Address } from "@/types/server";
import { useRouter } from "next/router";
import { Session } from "@/types/session";
import { UserCredentials } from "@/types/user";
import { getAllBooks } from "@/data/api.book";
import { LoadAllBooksRequest, loadAllBooks } from "@/redux/slices/books.slice";
import Storage from "@/types/storage";
import { loadAllStorages } from "@/redux/slices/storages.slice";

export default function Books() {
	const books = useSelector<StoreState, Book[]>(s => s.books);
	const storages = useSelector<StoreState, Storage[]>(s => s.storages);
	const address = useSelector<StoreState, Address | null>(s => s.connection.address);
	const credentials = useSelector<StoreState, UserCredentials | null>(s => s.session.credentials);
	const session = useSelector<StoreState, Session | null>(s => s.session.session);
	const dispatch = useDispatch();

	const storageUpdateRequired = useMemo<boolean>(() =>
		!!books
			.map(book => book.storage_id)
			.find(storage_id => !storages.some(storage => storage.id == storage_id)),
		[books, storages]);

	const router = useRouter();

	useEffect(() => {
		if (!address) {
			router.push("server");
			return;
		}

		if (!credentials) {
			router.push("login");
			return;
		}

		// todo: request token
		dispatch(loadAllBooks({ address, session: session! }) as any);
	}, []);

	useEffect(() => {
		dispatch(loadAllStorages({ address: address!, session: session! }) as any);
	}, [storageUpdateRequired]);

	return <SiteSkeleton title="EKönyv - könyvek" description="">
		<div className={styles.books}>
			<div className={styles.title}>
				<span> Könyvek </span>
			</div>
			<div className={styles.search}>
				<span>Keresés</span>
			</div>
			<div className={styles.data}>
				<table>
					<thead>
						<td>#</td>
						<td>ISBN/ISSN</td>
						<td>Cím</td>
						<td>Szerző</td>
						<td>Kiadva</td>
						<td>Jellemzők</td>
						<td>Felvéve (GMT)</td>
						<td>Hely</td>
						<td>Felhasználó</td>
						<td>Attribútumok</td>
					</thead>
					<tbody>
						{books.map(v => <tr key={v.id}>
							<td>{v.id}</td>
							<td>{v.in}</td>
							<td>{v.title}</td>
							<td>{v.authors}</td>
							<td>{v.published}</td>
							<td>{v.attributes}</td>
							<td>{new Date(v.created * 1000).toLocaleString("hu-HU", { timeZone: "GMT" })}</td>
							<td>{storages.find(storage => storage.id == v.storage_id)?.name ?? "ismeretlen"}</td>
							<td>{v.user_id}</td>
							<td>{v.flags}</td>
						</tr>)}
					</tbody>
				</table>
			</div>
		</div>
	</SiteSkeleton>
}