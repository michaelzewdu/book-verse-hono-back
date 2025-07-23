import { describe, it, expect } from 'bun:test';
import { app } from '../src/index'; // Adjust the import path as necessary

describe('Book Search API Tests', () => {
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

    it('Login test', async () => {
        const response = await app.request('/auth/login',
            {
                method: 'POST',
                body: JSON.stringify({ username: 'test1234', password: 'test1234' }), // this is a test credential, hide it in production
                headers: { 'Content-Type': 'application/json' }
            },);
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.data.message).toBe('Login successful');
        expect(data.data.token).toBeDefined();
    });

    it('Add book review test', async () => {
        // First, we need to get a valid token by logging in
        const token = await getToken();

        const response = await app.request('/books/reviews', {
            method: 'POST',
            body: JSON.stringify({
                bookId: '1',
                userId: 'user123',
                comment: 'Great book!',
                rating: 4
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.status);
        expect(response.status).toBe(201);
        const data = await response.json();
        expect(data.data.message).toBe('Review created successfully');
    })

    it('User purchases historytest', async () => {
        const token = await getToken();
        const response = await app.request('/users/1/purchases', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.data).toBeInstanceOf(Array);
    })

});

async function getToken() {
    const loginResponse = await app.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: 'test1234', password: 'test1234' }), // this is a test credential, hide it in production
        headers: { 'Content-Type': 'application/json' }
    });
    const loginData = await loginResponse.json();
    const token = loginData.data.token;
    return token;
}
