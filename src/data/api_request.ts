import { Address } from "@/types/server";

export const makeURL = (address: Address, endpoint: string) =>
	`${address.protocol}${address.ip}:${address.port}${endpoint}`;

export const postRequest = (address: Address, endpoint: string) =>
	fetch(makeURL(address, endpoint), { method: "POST", mode: "cors" })

export const getRequest = (address: Address, endpoint: string) =>
	fetch(makeURL(address, endpoint), { method: "GET", mode: "cors" })

