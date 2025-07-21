import Joi from "joi";

const userPurchaseHistorySchema = {
    params: Joi.object({
        userId: Joi.string().required().messages({
            "string.empty": "User ID is required",
        }),
    }),
}

const loginSchema = {
    body: Joi.object({
        username: Joi.string().required().messages({
            "string.empty": "Username is required",
        }),
        password: Joi.string().required().messages({
            "string.empty": "Password is required",
        }),
    }),
}

export { userPurchaseHistorySchema, loginSchema };