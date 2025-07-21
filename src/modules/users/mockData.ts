import type { IPurchase } from "./model";

var userPurchases: IPurchase[] = [
    {
        bookId: "1",
        userId: "user123",
        purchaseDate: new Date("2023-01-01"),
        quantity: 1,
        authorName: "Author One",
        bookTitle: "Book One",
        firstPublishYear: 2020,
        language: "English"
    },
    {
        bookId: "2",
        userId: "user456",
        purchaseDate: new Date("2023-02-01"),
        quantity: 2,
        authorName: "Author Two",
        bookTitle: "Book Two",
        firstPublishYear: 2021,
        language: "Spanish"
    }
];

export default userPurchases