import { newControllerData, newControllerError } from "../../types/controllerResult";
import booksService from "./service";

const booksQueryController = async (searchQuery) => {
    // Logic for searching books can be added here
    try {

        const result = await booksService.searchBooks(searchQuery);
        return newControllerData(
            result,
            200
        );
        
    } catch (error) {
        return newControllerError(
            error.message || "An error occurred while searching for books", 500
        );
    }
}

export default { booksQueryController }; 