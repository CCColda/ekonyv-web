import { Address, ServerInfo } from "@/types/server";
import { getRequest, getRequestTimeout } from "./api_request";
import kvCsvParse from "./key_value_csv";
import { EKonyvPacketKeys, KeyValuePacket } from "@/types/packets";

export async function checkAddress(address: Address): Promise<ServerInfo | null> {
	const res = await getRequestTimeout(address, "/ekonyv", 5_000);
	if (res.status != 200)
		return null;

	const csv = kvCsvParse(await res.text()) as KeyValuePacket<EKonyvPacketKeys>;

	return { name: csv.name, version: csv.version };
}