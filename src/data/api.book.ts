import Book from "@/types/book";
import { postRequest } from "./api";
import { Address } from "@/slices/connection.slice";
import kvCsvParse from "./key_value_csv";
import { KeyValuePacket, StatePacketKeys } from "@/types/packets";

export async function addBook(address: Address, token: string, book: Book) {
	const book_data_query = Object.entries(book).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');

	const res = await postRequest(address, `/api/book?token=${token}&${book_data_query}`);
	if (res.status != 200)
		return false;

	const csv = kvCsvParse(await res.text()) as KeyValuePacket<StatePacketKeys>;

	return csv.state == "success";
}
