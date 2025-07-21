import userPurchases from "./mockData"


const getUserPurchaseHistory = async (userId) => {
    return userPurchases.filter(purchase => purchase.userId === userId);
}

export default {
    getUserPurchaseHistory
}