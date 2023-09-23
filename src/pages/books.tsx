import SiteSkeleton from "@/components/site_skeleton";
import styles from "./books.module.scss";
import Book from "@/types/book";

export default function Books() {
	const books: Book[] = [
		{
			id: 1,
			in: 7272727272711,
			attributes: "kötött, 271 o.",
			authors: "Lakatos István",
			created: Date.now(),
			flags: 0b00000011,
			published: "2010",
			storage_id: 0,
			title: "Teszt könyv",
			user_id: 1
		}
	]
	return <SiteSkeleton title="EKönyv - könyvek" description="">
		<div className={styles.header}>Könyvek</div>
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
	</SiteSkeleton>
}