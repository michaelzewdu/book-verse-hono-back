import { Hono } from "hono";
import { validator } from 'hono/validator';
import { booksSearchQuery } from './validator';
import { handlerUtil } from '@utils/index';
import booksController from './controller';


const booksRouter = new Hono();

booksRouter.get('/search',
    validator('query', (queryString, c) => {
        const result = booksSearchQuery.query.validate(queryString, { abortEarly: false });
        if (result.error) {
            return c.json({ error: result.error.details.map(detail => detail.message) }, 400);
        }
        return queryString;
    }),
    handlerUtil.resultHandler(async (c) => {

        const searchQuery = c.req.query('q');
        console.log(`Searching for books with query: ${searchQuery}`);
        return booksController.booksQueryController(searchQuery);
    }
    ));



export default booksRouter