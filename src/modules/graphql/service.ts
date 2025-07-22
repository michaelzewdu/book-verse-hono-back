import { booksData, reviewsData } from "./mockData";

// This function retrieves book details along with their reviews based on the provided ISBN.
// It filters the books and reviews data to find matches and returns the combined information.
// It does not fetch from the REST apis in the boooks module because the data formats are different.
const graphqlService = (isbn: string) => {

    const books = booksData.filter(book => book.isbn === isbn);
    const bookWithReviews = books.map(book => {
        return {
            ...book,
            reviews: reviewsData.filter(review => review.bookId === book.isbn)
        };
    })
    return bookWithReviews;

}

export default graphqlService;