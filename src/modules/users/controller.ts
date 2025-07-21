import { newControllerData, newControllerError } from "@typesdef/controllerResult";
import usersService from "./service";
import { ILogin } from "./model";
import jwt from 'jsonwebtoken';
import envVars from '@config/config';

const getUserPurchaseHistoryController = async (userId) => {
    try {
        const result = await usersService.getUserPurchaseHistory(userId);
        return newControllerData(result, 200);
    } catch (error) {
        return newControllerError(error.message, 500);
    }
}

const userLoginController = async (loginBody: ILogin) => {
    // Logic for user login can be added here
    try {
        const token = jwt.sign({ username: loginBody.username }, envVars.jwtSecret, { expiresIn: '1h' });
        return newControllerData(
            { token, message: "Login successful" },
            200
        );
    } catch (error) {
        return newControllerError(
            error.message || "An error occurred during login", 500
        );
    }
}

export default { getUserPurchaseHistoryController, userLoginController };