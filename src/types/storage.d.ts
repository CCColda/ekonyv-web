export default interface Storage {
	id: number,
	name: string,
	user_id: number
}

export type PartialStorage = Omit<Storage, "id" | "user_id">;
