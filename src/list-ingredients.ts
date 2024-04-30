import { Recipe, isSingleIngredient } from "./recipe";

export function listIngredients(args: string[], recipes: Recipe[]) {
  const ingredientsSet: Set<string> = new Set();
  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      if (isSingleIngredient(ingredient)) {
        ingredientsSet.add(ingredient);
      } else {
        for (const singleIngredient of ingredient) {
          ingredientsSet.add(singleIngredient);
        }
      }
    }
  }

  console.log(Array.from(ingredientsSet).join("  "));
}
