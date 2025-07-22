import type { RootResolver } from "@hono/graphql-server";
import * as resolvers from './resolvers';


const rootResolver: RootResolver = () => {
    return{
        // hello: () => 'Hello from GraphQL!',
        book: async ({ isbn }) => {
            // Call the resolver function for book
            return resolvers.bookGqlResolver(isbn);
        },

    }
}

export default rootResolver;