import graphqlService from "./service";

export const bookGqlResolver = (isbn) => {
    try {
        const result = graphqlService(isbn);
        return result;
    } catch (error) {
        console.error('Error in bookGqlResolver:', error);
    }    
}