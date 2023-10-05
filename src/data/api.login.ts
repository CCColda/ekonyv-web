import { postRequest } from "./api_request";
import kvCsvParse from "./key_value_csv";
import { KeyValuePacket, LoginPacketKeys, RenewPacketKeys, LogoutPacketKeys } from "../types/packets";
import { Session } from "@/types/session";
import { Address } from "@/types/server";


export async function login(address: Address, username: string, password: string): Promise<Session | null> {
	const res = await postRequest(address, `/api/user/login?username=${username}&password=${password}`);

	if (res.status != 200)
		return null;

	const csv = kvCsvParse(await res.text()) as KeyValuePacket<LoginPacketKeys>;

	return { token: csv.token, refresh_token: csv.refresh, expire: Number(csv.expire) };
}

export async function renew(address: Address, refresh: string): Promise<Session | null> {
	const res = await postRequest(address, `/api/user/renew?refresh=${refresh}`);

	if (res.status != 200)
		return null;

	const csv = kvCsvParse(await res.text()) as KeyValuePacket<RenewPacketKeys>;

	return { token: csv.token, refresh_token: csv.refresh, expire: Number(csv.expire) };
}

export async function logout(address: Address, session: string): Promise<boolean> {
	const res = await postRequest(address, `/api/user/logout?token=${session}`);

	if (res.status != 200)
		return false;

	const csv = kvCsvParse(await res.text()) as KeyValuePacket<LogoutPacketKeys>;

	return csv.state == "success";
}

export async function logoutEverywhere(address: Address, session: string): Promise<boolean> {
	const res = await postRequest(address, `/api/user/logout_everywhere?token=${session}`);

	if (res.status != 200)
		return false;

	const csv = kvCsvParse(await res.text()) as KeyValuePacket<LogoutPacketKeys>;

	return csv.state == "success";
}