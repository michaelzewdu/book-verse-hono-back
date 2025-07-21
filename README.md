# Bun + hono Service

This is a simple API sample in Bun with hono based on [Google Cloud Run Quickstart](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service).

## Getting Started

Server should run automatically when starting a workspace if on idx/firebase studio. To run manually, run:
```sh
bun run --hot src/index.ts
```
### Instructions
- Endpoints `'/users/*'` and `'/books/reviews'` are auth protected. Make sure to authenticate before hitting them
- Authentication method used is JWT
- Make sure to provide a secret key. For environment variable details view example.env at root
