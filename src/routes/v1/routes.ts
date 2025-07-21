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

export default routes;