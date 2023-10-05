export type Address = {
	protocol: "http://" | "https://",
	ip: string,
	port: number
};

export type ServerInfo = {
	name: string,
	version: string
};
