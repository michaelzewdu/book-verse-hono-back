import type { Context, HonoRequest, TypedResponse } from "hono";
import { IErrorResponse, instanceOfIErrorResponse } from "../types/errorResponse";
import logger from "../config/logger";
import { IControllerResult } from "../types/controllerResult";
import { StatusCode, SuccessStatusCode } from "hono/utils/http-status";

/**
 * A utility function to handle the result of a function that returns a promise.
 * It wraps the function and handles the response.
 *
 * @param func - The function to be wrapped, which takes a Context and returns a Promise of TypedResponse.
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

function errorHandler(c: Context, error: IErrorResponse | any): void {
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
    c.json({
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