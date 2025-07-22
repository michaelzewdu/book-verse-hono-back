
export const bookSchema = /* GraphQL */ ` 
    type Review {
        bookId: ID!
        userId: ID!
        rating: Int!
        comment: String
    }

    type Book {
        # isbn: ID!
        title: String!
        authors: [String!]!
        description: String!
        reviews: [Review!]!
        # firstPublishYear: String!
        # language: String;
        # authorName: String;
    }

    type Books {
        results: [Book]
    }
`;

export interface IBook {
    isbn: string;
    title: string;
    authors: string[];
    description: string;
}

export interface IBookReview {
    bookId: string;
    userId: string;
    rating: number;
    comment?: string;
}