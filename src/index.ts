import { Hono } from 'hono';
const app = new Hono();

app.get('/', (c) => {
  // const name = process.env.NAME || 'World';
  // res.send(`Hello ${name}!`);
  return c.text('Hello Hono World!');
});

// n