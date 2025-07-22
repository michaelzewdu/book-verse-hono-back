import { newControllerData, newControllerError } from "@typesdef/controllerResult";
import usersService from "./service";
import type { ILogin } from "./model";
import * as jose from "jose";
import envVars from "@config/config";
import logger from "@config/logger";

const getUserPurchaseHistoryController = async (userId) => {
    try {
        const result = await usersService.getUserPurchaseHistory(userId);
        return newControllerData(result, 200);
    } catch (error) {
        return newControllerError(error.message, 500);
    }
}

const userLoginController = async (loginBody: ILogin) => {
    // Logic for user login added here
    try {
        const token = await new jose.SignJWT({ username: loginBody.username })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(new TextEncoder().encode(envVars.jwtSecret));
        return newControllerData(
            { token, message: "Login successful" },
            200
        );
    } catch (error) {
        logger.error(`Login error: ${error}`);
        return newControllerError(
            error.message || "An error occurred during login", 500
        );
    }
}

export default { getUserPurchaseHistoryController, userLoginController };