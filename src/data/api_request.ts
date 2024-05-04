import { Address } from "@/types/server";

export const makeURL = (address: Address, endpoint: string) =>
	`${address.protocol}${address.ip}:${address.port}${endpoint}`;

export const postRequest = (address: Address, endpoint: string) =>
	fetch(makeURL(address, endpoint), { method: "POST", mode: "cors" })

export const getRequest = (address: Address, endpoint: string) =>
	fetch(makeURL(address, endpoint), { method: "GET", mode: "cors" })

export async function getRequestTimeout(address: Address, endpoint: string, timeout: number) {
	const controller = new AbortController();

	const timeout_id = setTimeout(() => controller.abort("Timed out"), timeout);

	const res = await fetch(makeURL(address, endpoint), {
		signal: controller.signal,
		method: "GET",
		mode: "cors"
	});

	clearTimeout(timeout_id);

	return res;
}