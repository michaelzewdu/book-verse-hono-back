import path from 'path';
import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = Joi.object().keys({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test').required(),
    JWT_SECRET: Joi.string().required()
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    console.error(`Config validation error: ${error}`);
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    env: envVars.NODE_ENV,
    jwtSecret: envVars.JWT_SECRET
};