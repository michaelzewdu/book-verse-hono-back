
const searchBooks = async (searchQuery) => {
    // const openLibraryUrl = 'https://openlibrary.org/search.json';
    const requestUrl = `https://openlibrary.org/search.json?q=${searchQuery}`;
    const res = await fetch(requestUrl);
    if (!res.ok) {
        throw new Error(`Error fetching books: ${res.statusText}`);
    }
    return res.json();
}

export default {
    searchBooks
}