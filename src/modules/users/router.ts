import userController from "./controller";
import { Hono } from "hono";
import { handlerUtil } from "@utils/index";
import { validator } from "hono/validator";
import { loginSchema, userPurchaseHistorySchema } from "./validator";

const usersRouter = new Hono();
const authRouter = new Hono();

usersRouter.get('/:userId/purchases',
    validator('param', (userId, c) => {
        const result = userPurchaseHistorySchema.params.validate(userId);
        if (result.error) {
            return c.json({ error: result.error.details.map(detail => detail.message) }, 400);
        }
        return userId;
    }),
    handlerUtil.resultHandler(async (c) => {
        const userId = c.req.param('userId');

        return userController.getUserPurchaseHistoryController(userId);
    })
);

authRouter.post('/login',
    validator('json', (loginBody, c) => {
        const result = loginSchema.body.validate(loginBody);
        if (result.error) {
            return c.json({ error: result.error.details.map(detail => detail.message) }, 400);
        }
        return loginBody;
    }),
    handlerUtil.resultHandler(async (c) => {
        // Logic for user login added here
        const loginBody = await c.req.json();
        return userController.userLoginController(loginBody);
    })
);


export {usersRouter, authRouter};
