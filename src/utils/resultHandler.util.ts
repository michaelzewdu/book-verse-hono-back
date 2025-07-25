import type { IControllerResult } from "@typesdef/controllerResult";
import logger from "../config/logger";
import type { StatusCode} from "hono/utils/http-status";
import { type IErrorResponse, instanceOfIErrorResponse } from "../types/errorResponse";
import type { Context} from "hono";

/**
 * A utility function to handle the result of a function that returns a promise.
 * It wraps the function and handles the response.
 *
 * @param func - The function to be wrapped, which takes a Context and returns a Promise of IControllerResult.
 * @returns A wrapped function that can be used in Hono routes.
 */
function resultHandler(
    func: (c: Context) => Promise<IControllerResult<unknown>>
) {
    const wrapped = async (c) => {
        try {
            const result = await func(c);
            if (result.error) {
                return errorHandler(c, result.error);
            }

            return successHandler(c, { data: result.data, error: null }, result.statusCode);
        } catch (error) {
            return errorHandler(c, error);
        }
    }

    return wrapped;
}

function successHandler<T>(c: Context, data: T | T[] | null, statusCode?: StatusCode) {
    c.status(statusCode || 200);
    return c.json(
        data,
    );
}

function errorHandler(c: Context, error: IErrorResponse | any) {
    let message: string;
    const genericError = "An unexpected error occurred";
    if (instanceOfIErrorResponse(error)) {
        message = error.errorMessage || genericError;
        logger.error(message)
    } else {
        message = genericError;
        logger.error(message);
    }
    const statusCode = error.statusCode || 500;
    c.status(statusCode)
    return c.json({
        data: null,
        error: {
            statusCode,
            errorMessage: message
        }
    })
}

export default {
    resultHandler,
    errorHandler
}