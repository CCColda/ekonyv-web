import { getAllBooks } from "@/data/api.book";
import Book from "@/types/book";
import { Address } from "@/types/server";
import { Session } from "@/types/session";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type LoadAllBooksRequest = {
	address: Address,
	session: Session
};

const initialState: Book[] = [];

export const loadAllBooks = createAsyncThunk<Book[], LoadAllBooksRequest>("books/loadAll", async (arg, thunk) => {
	const books = await getAllBooks(arg.address, arg.session.token);

	return books ?? [];
});

const bookSlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		addBook: (state, action: PayloadAction<Book>) => {
			if (!state.some(v => v.id == action.payload.id || v.in == action.payload.in))
				state.push(action.payload);
		},
		clearBooks: (state) => {
			state = [];
		}
	},
	extraReducers: builder => {
		builder.addCase(loadAllBooks.fulfilled, (state, action) => {
			action.payload.forEach(book => {
				if (!state.some(v => v.id == book.id || v.in == book.in))
					state.push(book);
			});
		});
	}
});

export default bookSlice;
