import Book from "@/types/book";
import { getRequest, postRequest } from "./api_request";
import kvCsvParse from "./key_value_csv";
import { KeyValuePacket, StatePacketKeys } from "@/types/packets";
import { Address } from "@/types/server";
import { parse } from "csv-string";

export async function addBook(address: Address, token: string, book: Book) {
	const book_data_query = Object.entries(book).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');

	const res = await postRequest(address, `/api/book?token=${token}&${book_data_query}`);
	if (res.status != 200)
		return false;

	const csv = kvCsvParse(await res.text()) as KeyValuePacket<StatePacketKeys>;

	return csv.state == "success";
}

export async function getAllBooks(address: Address, token: string): Promise<Book[] | null> {
	const res = await getRequest(address, `/api/book/all?token=${token}`);
	if (res.status != 200)
		return null;

	const csv = parse(await res.text());

	//! @todo
	return csv.slice(1).map(book_csv => ({
		id: Number(book_csv[0]),
		in: Number(book_csv[1]),
		title: book_csv[2],
		authors: book_csv[3],
		published: book_csv[4],
		attributes: book_csv[5],
		created: Number(book_csv[6]),
		storage_id: Number(book_csv[7]),
		user_id: Number(book_csv[8]),
		flags: Number(book_csv[9])
	}));
}