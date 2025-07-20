import bookReviews from "./mockData";

const searchBooks = async (searchQuery) => {
    // const openLibraryUrl = 'https://openlibrary.org/search.json';
    const requestUrl = `https://openlibrary.org/search.json?q=${searchQuery}`;
    const res = await fetch(requestUrl);
    if (!res.ok) {
        throw new Error(`Error fetching books: ${res.statusText}`);
    }
    return res.json();
}

const createReview = (review) => {
    // Logic for creating a book review added here
    bookReviews.push(review)
    return review
}

const findBookReview = (bookId: string) => {
    return bookReviews.filter((review) => review.bookId === bookId)
}

export default {
    searchBooks, createReview, findBookReview
}