import { Address } from "@/slices/connection.slice";

const makeURL = (address: Address, endpoint: string) =>
	`http://${address.ip}:${address.port}${endpoint}`;

export async function checkAddress(address: Address) {
	const res = await fetch(makeURL(address, "/ekonyv"), {
		method: "GET",
		mode: "cors"
	});

	return res.status == 200;
}
