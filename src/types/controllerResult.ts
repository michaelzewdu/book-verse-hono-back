import { StatusCode, SuccessStatusCode } from "hono/utils/http-status";
import { type IErrorResponse, newError } from "./errorResponse";

export interface IControllerResult<T> {
    data: T | null;
    error: IErrorResponse | null;
    statusCode?: StatusCode;
}

export function newControllerError<T>(errorMessage: string, statusCode?: StatusCode): IControllerResult<T> {
    return {
        error: newError(errorMessage, statusCode),
        data: null,
    }
}

export function newControllerData<T>(data: T, statusCode?: SuccessStatusCode): IControllerResult<T> {
    return {
        data,
        error: null,
        statusCode: statusCode || 200, // Default to 200 if no status code is provided
    }
}
