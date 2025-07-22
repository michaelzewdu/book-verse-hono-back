import { buildSchema } from 'graphql';
import { bookSchema } from './model';

// Data types allowed in GraphQL schema: int, float, string, boolean, ID
const graphSchema = buildSchema(/* GraphQL */`
  type Query {
    book(isbn: ID!): [Book]
  }
  
   ${bookSchema}

`);

export default graphSchema;


