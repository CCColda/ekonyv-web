import SiteSkeleton from "@/components/site_skeleton";

import styles from "./storages.module.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/redux/store";
import { Address } from "@/types/server";
import { useRouter } from "next/router";
import { Session } from "@/types/session";
import { UserCredentials } from "@/types/user";

import { getAllBooks } from "@/data/api.book";
import { LoadAllBooksRequest, loadAllBooks } from "@/redux/slices/books.slice";
import { loadAllStorages } from "@/redux/slices/storages.slice";
import Storage from "@/types/storage";

export default function Books() {
	const storages = useSelector<StoreState, Storage[]>(s => s.storages);
	const address = useSelector<StoreState, Address | null>(s => s.connection.address);
	const credentials = useSelector<StoreState, UserCredentials | null>(s => s.session.credentials);
	const session = useSelector<StoreState, Session | null>(s => s.session.session);
	const dispatch = useDispatch();

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

		dispatch(loadAllStorages({ address, session: session! }) as any);
	}, []);

	return <SiteSkeleton title="EKönyv - helyek" description="">
		<div className={styles.books}>
			<div className={styles.title}>
				<span> Helyek </span>
			</div>
			<div className={styles.search}>
				<span>Keresés</span>
			</div>
			<div className={styles.data}>
				<table>
					<thead>
						<td>#</td>
						<td>Név</td>
						<td>Felhasználó</td>
					</thead>
					<tbody>
						{storages.filter(v => v.id !== 0).map(storage => <tr key={storage.id}>
							<td>{storage.id}</td>
							<td>{storage.name}</td>
							<td>{storage.user_id}</td>
						</tr>)}
					</tbody>
				</table>
			</div>
		</div>
	</SiteSkeleton>
}