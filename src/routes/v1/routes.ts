import booksRouter from '@modules/books/router';
import {usersRouter, authRouter} from '@modules/users/router';

const routes = [
    {
        path: '/books',
        route: booksRouter
    },
    {
        path: '/users',
        route: usersRouter
    },
    {
        path: '/auth',
        route: authRouter
    }
]

const authenticatedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

// Define routes that require authentication
// These routes will be protected by the isAuthenticated middleware
const authenticatedRoutes = ['/users/*', '/books/reviews']

export {routes, authenticatedMethods, authenticatedRoutes};