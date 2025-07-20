import { newControllerData, newControllerError } from "@typesdef/controllerResult";
import booksService from "./service";

const booksQueryController = async (searchQuery) => {
    // Logic for searching books added here
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

const createReviewController = (review) => {
    // Logic for creating a book review can be added here
    try {
        const result = booksService.createReview(review);
        return newControllerData(
            {
                result,
                message: "Review created successfully"
            },
            201
        );
    } catch (error) {
        return newControllerError(
            error.message || "An error occurred while creating the review", 500
        );
    }
}

const findBookReviewController = (bookId: string) => {

    try {
        const result = booksService.findBookReview(bookId);
        return newControllerData(
            result,
            200
        )
    } catch (error) {
        return newControllerError(error.message || "An error occurred while finding book reviews", 500)
    }
}

export default { booksQueryController, createReviewController, findBookReviewController }; 