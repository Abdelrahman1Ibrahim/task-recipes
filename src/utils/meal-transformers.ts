import { Meal } from "@/types/recipes";

export function extractIngredients(recipe: Meal): string[] {
  const ingredientsList: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && typeof ingredient === "string" && ingredient.trim()) {
      const content = `${
        measure && typeof measure === "string" && measure.trim() !== ""
          ? `${measure.trim()} `
          : ""
      }${ingredient.trim()}`;
      ingredientsList.push(content);
    }
  }
  return ingredientsList;
}

export function extractInstructions(recipe: Meal): string[] {
  return recipe.strInstructions
    ? recipe.strInstructions.split("\r\n").filter((step) => step.trim() !== "")
    : [];
}
