export default interface Book {
	id: number,
	in: number,
	title: string,
	authors: string,
	published: string,
	attributes: string,
	created: number,
	storage_id: number,
	user_id: number,
	flags: number
}

export type PartialBook = Omit<Book, "id" | "created" | "user_id">;
