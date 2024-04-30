export type Recipe = {
  name: string;
  ingredients: Ingredient[];
};

export type Ingredient = string | string[];

export function isSingleIngredient(ingredient: string | string[]): ingredient is string {
  return typeof ingredient === "string" || ingredient instanceof String;
}
