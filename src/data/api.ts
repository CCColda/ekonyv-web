import { Address } from "@/slices/connection.slice";
import { SessionState } from "@/slices/session.slice";
import { parse } from "csv-string";
import kvCsvParse from "./key_value_csv";
import { KeyValuePacket, LoginPacketKeys, LogoutPacketKeys, RegisterPacketKeys, RenewPacketKeys } from "../types/packets";

export const makeURL = (address: Address, endpoint: string) =>
	`${address.protocol}${address.ip}:${address.port}${endpoint}`;

export const postRequest = (address: Address, endpoint: string) =>
	fetch(makeURL(address, endpoint), { method: "POST", mode: "cors" })

export const getRequest = (address: Address, endpoint: string) =>
	fetch(makeURL(address, endpoint), { method: "GET", mode: "cors" })

