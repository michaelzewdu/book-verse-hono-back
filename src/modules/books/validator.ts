import Joi from "joi";


const booksSearchQuery = {
    query: Joi.object({
        q: Joi.string().min(1).required().messages({
            "string.empty": "Query is required",
        }),
    }),
};

export { booksSearchQuery };