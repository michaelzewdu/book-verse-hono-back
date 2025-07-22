import { Hono } from 'hono';
import { routes, authenticatedRoutes, authenticatedMethods } from '@routes/v1/routes';
import envVars from '@config/config';
import { graphqlServer } from '@hono/graphql-server';
import graphSchema from '@modules/graphql/schema';
import rootResolver from '@modules/graphql/rootResolver';
import { fire } from 'hono/service-worker'
import logger from '@config/logger';
import { isAuthenticated } from './middlewares/auth';

const app = new Hono();

app.use('*', async (c, next) => {
  // Middleware to log the request time, user-agent, method and URL
  logger.info(`${Date().toString()} ${c.req.method} ${c.req.url} ${c.req.header("User-Agent")}`);
  return next();
});

// Middleware to handle authentication for specific methods
// This middleware checks for the presence of a Bearer token in the Authorization header
// user purchases is also auth protected because it is under the /users/:userId/purchases route
app.on(authenticatedMethods, authenticatedRoutes, async (c, next) => isAuthenticated(c, next));

app.use('/graphql', graphqlServer({
  schema: graphSchema,
  rootResolver: rootResolver,
  graphiql: true, // Enable GraphiQL user interface
}))

fire(app)  // Register the service worker

app.get('/', (c) => {
  return c.text('Hello Hono World! Welcome to BookVerse API', 200);
});

for (const { path, route } of routes) {
  app.route(path, route);
}

app.onError((err, c) => {
  logger.error(`Error occurred: ${err.message}`, { stack: err.stack });
  // Return a JSON response with the error message and status code 500
  return c.json({ error: err.message , message: "An unexpected error occurred"}, 500);
});

export {app};

export default {
  port: envVars.port || 3000,
  fetch: app.fetch
}