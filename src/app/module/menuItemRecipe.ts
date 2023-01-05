import { Ingredient } from "./ingredient";

export interface MenuItemRecipe {
    id : number,
    name : string,
    description: string,
    photo: number,
    ingredients: Array<Ingredient>
}