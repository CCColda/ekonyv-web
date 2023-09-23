import { Address } from "@/slices/connection.slice";
import { postRequest } from "./api";
import kvCsvParse from "./key_value_csv";
import { KeyValuePacket, RegisterPacketKeys } from "../types/packets";

export async function requestCode(address: Address) {
	const res = await postRequest(address, `/user/req_code`);

	return res.status == 200;
}

export async function register(address: Address, username: string, password: string, code: string): Promise<[boolean, string]> {
	const res = await postRequest(address, `/user/register?username=${username}&password=${password}&code=${code}`);

	if (res.status != 200)
		return [false, `HTTP error ${res.status}`];

	const csv = kvCsvParse(await res.text()) as KeyValuePacket<RegisterPacketKeys>;

	return csv.state == "success" ? [true, ""] : [false, csv.reason];
}

