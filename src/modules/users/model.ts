
export interface IPurchase {
    bookId: string;
    userId: string;
    purchaseDate: Date;
    quantity?: number;
    authorName: string;
    bookTitle: string;
    firstPublishYear: number;
    language: string;
}

export interface ILogin {
    username: string;
    password: string;
}