import { Address, ServerInfo } from "@/slices/connection.slice";
import { getRequest, makeURL } from "./api";
import kvCsvParse from "./key_value_csv";
import { EKonyvPacketKeys, KeyValuePacket } from "@/types/packets";

export async function checkAddress(address: Address): Promise<ServerInfo | null> {
	const res = await getRequest(address, "/ekonyv");
	if (res.status != 200)
		return null;

	const csv = kvCsvParse(await res.text()) as KeyValuePacket<EKonyvPacketKeys>;

	return { name: csv.name, version: csv.version };
}