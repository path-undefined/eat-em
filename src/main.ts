import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { listIngredients } from "./list-ingredients";
import { generateEatingPlan } from "./generate-eating-plan";

(async function () {
  const recipes = JSON.parse(readFileSync(resolve(__dirname, "../data/recipes.json"), { encoding: "utf8" }));

  const args: string[] = process.argv.slice(2);

  switch (args[0]) {
    case "list":
      listIngredients(args.slice(1), recipes);
      break;

    case "generate":
      generateEatingPlan(args.slice(1), recipes);
      break;

    default:
      console.log("Error: Unknown command");
      process.exit();
  }
})();
