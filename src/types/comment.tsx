import userType from "./user";

export default interface commentType {
    _id: string;
    userId: userType;
    productId: string;
    content: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}
