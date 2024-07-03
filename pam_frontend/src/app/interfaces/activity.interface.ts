import { Category } from "./category.interface";
import { User } from "./user.interface";

export interface Activity {
    id?: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    user: User; // Relacionamento com User
    category: Category; // Relacionamento com Category
}
