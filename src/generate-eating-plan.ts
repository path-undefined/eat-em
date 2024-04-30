import { Recipe, isSingleIngredient } from "./recipe";

export function generateEatingPlan(args: string[], recipes: Recipe[]) {
  const existingIngredients = args;
  const weightMap: Array<{name: string, weight: number}> = [];

  for (const recipe of recipes) {
    let weight = 1;
    
    recipe.ingredients.flat().forEach((ingredient) => {
      if (existingIngredients.includes(ingredient)) {
        weight ++;
      }
    });

    weightMap.push({ name: recipe.name, weight });
  }

  const results: Recipe[] = [];
  for (let i = 0; i < 7; i++) {
    const totalWeight = weightMap.map((record) => record.weight).reduce((c, p) => c + p, 0);
    const randomNumber = Math.random() * totalWeight;
    let index = 0;
    let currentWeight = 0;
    while (currentWeight <= randomNumber) {
      currentWeight += weightMap[index].weight;
      index ++;
    }
    const recipeRecord = weightMap[index - 1];
    weightMap.splice(index - 1, 1);

    const originalRecipe = recipes.find((recipe) => recipe.name === recipeRecord.name)!;
    const name = originalRecipe.name;
    const ingredients = originalRecipe.ingredients.map((ingredient) => {
      if (isSingleIngredient(ingredient)) {
        return ingredient;
      } else {
        const existingIngredient = ingredient.find((i) => existingIngredients.includes(i));
        if (existingIngredient) {
          return existingIngredient;
        } else {
          return ingredient[Math.floor(Math.random() * ingredient.length)];
        }
      }
    });

    results.push({ name, ingredients });
  }

  const missingIngredientSet: Set<string> = new Set();
  console.log("本周食谱：");
  for (const result of results) {
    console.log("  " + result.name);
    console.log("    " + result.ingredients.join("，"));

    result.ingredients.flat().forEach((ingredient) => {
      if (!existingIngredients.includes(ingredient)) {
        missingIngredientSet.add(ingredient);
      }
    });
  }

  console.log("需要采购的食材：");
  console.log("  " + Array.from(missingIngredientSet).join("，"));
}
