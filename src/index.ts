import { Hono } from 'hono';
import routes from '@routes/v1/routes';
import { bearerAuth } from 'hono/bearer-auth';
import envVars from '@config/config';
import { graphqlServer } from '@hono/graphql-server';
import graphSchema from '@modules/graphql/schema';
import rootResolver from '@modules/graphql/rootResolver';
import { fire } from 'hono/service-worker'
import logger from '@config/logger';
import * as jose from 'jose';
import { isAuthenticated } from './middlewares/auth';

const app = new Hono();

const authenticatedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

// Middleware to handle authentication for specific methods
// This middleware checks for the presence of a Bearer token in the Authorization header
// user purchases is also auth protected because it is under the /users/:userId/purchases route
app.on(authenticatedMethods, ['/users/*', '/books/reviews'], async (c, next) => isAuthenticated(c, next));

app.use('/graphql', graphqlServer({
  schema: graphSchema,
  rootResolver: rootResolver,
  graphiql: true, // Enable GraphiQL interface
}))

fire(app)

app.get('/', (c) => {
  return c.text('Hello Hono World! Welcome to BookVerse API', 200);
});

app.use('*', async (c, next) => {
  // Middleware to log the request time, user-agent, method and URL
  logger.info(`${Date().toString()} ${c.req.method} ${c.req.url} ${c.req.header("User-Agent")}`);
  return next();
});

for (const { path, route } of routes) {
  app.route(path, route);
}

export default {
  port: envVars.port || 3000,
  fetch: app.fetch
}