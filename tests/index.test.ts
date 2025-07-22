import { describe, it, expect } from 'bun:test';
import { app } from '../src/index'; // Adjust the import path as necessary

describe('Book Search API', () => {
    it('should return a list of books', async () => {
        const response = await app.request('/books/search?q=fifty%20shades%20of%20grey', {
            method: 'GET'
        });
        expect(response.status).toBe(200);
    });

    it('find book review test', async () => {
        const response = await app.request('/books/1/reviews', {
            method: 'GET'
        });
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toBeInstanceOf(Object);
        expect(data).toMatchObject({
            "data": [
                {
                    "bookId": "1",
                    "userId": "user123",
                    "comment": "Great book!",
                    "rating": 4
                }
            ],
            "error": null
        });
    });

});
