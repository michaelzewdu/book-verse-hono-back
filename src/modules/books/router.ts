import { Hono } from "hono";
import { validator } from 'hono/validator';
import { bookReviewSearchSchema, booksSearchQuerySchema, createBookReviewSchema } from './validator';
import { handlerUtil } from '@utils/index';
import booksController from './controller';


const booksRouter = new Hono();

booksRouter.get('/search',
    validator('query', (queryString, c) => {
        const result = booksSearchQuerySchema.query.validate(queryString, { abortEarly: false });
        if (result.error) {
            return c.json({ error: result.error.details.map(detail => detail.message) }, 400);
        }
        return queryString;
    }),
    handlerUtil.resultHandler(async (c) => {
        const searchQuery = await c.req.query('q');
        // console.log(`Searching for books with query: ${searchQuery}`);
        return booksController.booksQueryController(searchQuery);
    }
    ));

booksRouter.post('/reviews',
    validator('json', (reviewBody, c) => {
        const result = createBookReviewSchema.body.validate(reviewBody);
        if (result.error){
            return c.json({ error: result.error.details.map(detail => detail.message)}, 400)
        }
        return reviewBody
    }),
    handlerUtil.resultHandler(async (c) => {
        const review = await c.req.json();
        return booksController.createReviewController(review);
    }
));

booksRouter.get('/:id/reviews',
    validator('param', (id, c) => {
        const result = bookReviewSearchSchema.params.validate(id);
        if (result.error) {
            return c.json({error: result.error.details.map(detail => detail.message)}, 400);
        }
        return id; 
    }),
    handlerUtil.resultHandler(async (c) => {
        const bookId = await c.req.param('id');
        // console.log(`Finding reviews for book with ID: ${bookId}`);
        return booksController.findBookReviewController(bookId)
    })
);

export default booksRouter