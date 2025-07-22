import { bearerAuth } from 'hono/bearer-auth';
import envVars from '@config/config';
import * as jose from 'jose';

export const isAuthenticated = async (c, next)=> {
  const bearer = bearerAuth({
    verifyToken: async (token, c) => {
      // token verification logic
      if (!token) {
        return false;
      }
      // Verify the token using JWT secret from config
      try {
        const decoded = await jose.jwtVerify(token, new TextEncoder().encode(envVars.jwtSecret));
        c.set('user', decoded); // Store user info in context
        return true;
      } catch (error) {
        console.error('Token verification error:', error);
        return false;
      }
    },
  });
  return await bearer(c, next);
}