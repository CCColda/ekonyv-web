import Book, { PartialBook } from "@/types/book";
import { getRequest, postRequest } from "./api_request";
import kvCsvParse from "./key_value_csv";
import { KeyValuePacket, StatePacketKeys } from "@/types/packets";
import { Address } from "@/types/server";
import { parse } from "csv-string";

export async function addBook(address: Address, token: string, book: PartialBook) {
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

	if (csv.length == 0)
		return [];

	if (csv[0].length != 10)
		return [];

	const header_indices: Record<keyof Book, number> = {
		id: csv[0].indexOf("id"),
		in: csv[0].indexOf("in"),
		attributes: csv[0].indexOf("attributes"),
		authors: csv[0].indexOf("authors"),
		created: csv[0].indexOf("created"),
		flags: csv[0].indexOf("flags"),
		published: csv[0].indexOf("published"),
		storage_id: csv[0].indexOf("storage_id"),
		title: csv[0].indexOf("title"),
		user_id: csv[0].indexOf("user_id")
	};

	return csv.slice(1).map(book_csv => ({
		id: Number(book_csv[header_indices.id]),
		in: Number(book_csv[header_indices.in]),
		title: book_csv[header_indices.title],
		authors: book_csv[header_indices.authors],
		published: book_csv[header_indices.published],
		attributes: book_csv[header_indices.attributes],
		created: Number(book_csv[header_indices.created]),
		storage_id: Number(book_csv[header_indices.storage_id]),
		user_id: Number(book_csv[header_indices.user_id]),
		flags: Number(book_csv[header_indices.flags])
	}));
}