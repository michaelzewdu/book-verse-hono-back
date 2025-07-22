import type { IBook, IBookReview } from "./model";


export const booksData: IBook[] = [
    {
        isbn: '9780439139595',
        authors: ['F. Scott Fitzgerald'],
        title: 'The Great Gatsby',
        description: 'A novel set in the 1920s that explores themes of decadence, idealism, resistance to change, social upheaval, and excess.'
    },
    {
        isbn: '9780743273565',
        authors: ['J.K. Rowling'],
        title: 'Harry Potter and the Philosopher\'s Stone',
        description: 'A magical story about a young wizard who discovers his magical powers and faces a dangerous future.'
    },
    {
        isbn: '9780140449136',
        authors: ['Leo Tolstoy'],
        title: 'War and Peace',
        description: 'A historical novel that intertwines the lives of several families during the Napoleonic Wars.'
    },
    {
        isbn: '9780140430721',
        authors: ['Jane Austen'],
        title: 'Pride and Prejudice',
        description: 'A classic novel that follows the romantic love story between Elizabeth Bennet and Mr. Darcy.'
    }
];

export const reviewsData: IBookReview[] = [
    {
        bookId: '9780439139595',
        userId: 'user123',
        rating: 4,
        comment: 'Great book!'
    },
    {
        bookId: '9780743273565',
        userId: 'user456',
        rating: 5,
        comment: 'I loved it!'
    },
    {
        bookId: '9780140449136',
        userId: 'user789',
        rating: 3,
        comment: 'Interesting read, but a bit long.'
    },
    {
        bookId: '9780140430721',
        userId: 'user101',
        rating: 5,
        comment: 'A timeless classic!'
    },
    {
        bookId: '9780140430721',
        userId: 'user102',
        rating: 2,
        comment: 'Not my cup of tea.'
    },
    {
        bookId: '9780743273565',
        userId: 'user103',
        rating: 4,
        comment: 'Enjoyed the magical elements.'
    },
    {
        bookId: '9780140449136',
        userId: 'user104',
        rating: 5,
        comment: 'A masterpiece of literature.'
    },
    {
        bookId: '9780439139595',
        userId: 'user105',
        rating: 3,
        comment: 'Good, but not as great as I expected.'
    }
];