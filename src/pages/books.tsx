import SiteSkeleton from "@/components/site_skeleton";
import styles from "./books.module.scss";
import Book from "@/types/book";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/store";
import { Address } from "@/types/server";
import { useRouter } from "next/router";
import { Session } from "@/types/session";
import { UserCredentials } from "@/types/user";
import { getAllBooks } from "@/data/api.book";

export default function Books() {
	const [books, setBooks] = useState<Book[]>([]);
	const address = useSelector<StoreState, Address | null>(s => s.connection.address);
	const credentials = useSelector<StoreState, UserCredentials | null>(s => s.session.credentials);
	const session = useSelector<StoreState, Session | null>(s => s.session.session);

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

		getAllBooks(address, session!.token).then(books => books && setBooks(books));
	}, []);

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
						<td>Felvéve</td>
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
							<td>{v.created}</td>
							<td>{v.storage_id}</td>
							<td>{v.user_id}</td>
							<td>{v.flags}</td>
						</tr>)}
					</tbody>
				</table>
			</div>
		</div>
	</SiteSkeleton>
}