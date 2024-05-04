import Book from "@/types/book";
import { getRequest, postRequest } from "./api_request";
import kvCsvParse from "./key_value_csv";
import { AddStoragePacketKeys, KeyValuePacket, StatePacketKeys } from "@/types/packets";
import { Address } from "@/types/server";
import { parse } from "csv-string";
import Storage, { PartialStorage } from "@/types/storage";

export async function addStorage(address: Address, token: string, storage: PartialStorage): Promise<[boolean, number]> {
	const res = await postRequest(address, `/api/storage?token=${token}&name=${encodeURIComponent(storage.name)}`);
	if (res.status != 200)
		return [false, 0];

	const csv = kvCsvParse(await res.text()) as KeyValuePacket<AddStoragePacketKeys>;

	return [csv.state == "success", csv.state == "success" ? Number(csv.id) : 0];
}

export async function getAllStorages(address: Address, token: string): Promise<Storage[] | null> {
	const res = await getRequest(address, `/api/storage/all?token=${token}`);
	if (res.status != 200)
		return null;

	const csv = parse(await res.text());

	if (csv.length == 0)
		return [];

	if (csv[0].length != 3)
		return [];

	const header_indices: Record<keyof Storage, number> = {
		id: csv[0].indexOf("id"),
		name: csv[0].indexOf("name"),
		user_id: csv[0].indexOf("user")
	};

	return csv.slice(1).map(storage_csv => ({
		id: Number(storage_csv[header_indices.id]),
		name: storage_csv[header_indices.name],
		user_id: Number(storage_csv[header_indices.user_id])
	}));
}
