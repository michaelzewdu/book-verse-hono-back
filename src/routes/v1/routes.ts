import booksRouter from '@modules/books/router';
import usersRouter from '@modules/users/router';
const routes = [
    {
        path: '/books',
        route: booksRouter
    },
    {
        path: '/users',
        route: usersRouter
    }
]

export default routes;