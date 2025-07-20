import Joi from "joi";


const booksSearchQuerySchema = {
    query: Joi.object({
        q: Joi.string().min(1).required().messages({
            "string.empty": "Query is required",
        }),
    }),
};

const createBookReviewSchema = {
    body: Joi.object({
        bookId: Joi.string().min(1).required().messages({
            "string.empty": "Book ID is required",
        }),
        userId: Joi.string().min(1).required().messages({
            "string.empty": "User ID is required",
        }),
        rating: Joi.number().min(1).max(10).required().messages({
            "string.empty": "Rating is required",
        }),
        comment : Joi.string().min(1).required().messages({
            "string.empty": "Review is required",
        }),
    }),
}

const bookReviewSearchSchema = {
    params: Joi.object({
        id: Joi.string().required().messages({
            "string.empty": "Book id is required to find book review"
        })
    })
}

export { booksSearchQuerySchema, createBookReviewSchema, bookReviewSearchSchema };