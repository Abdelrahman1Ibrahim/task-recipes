export interface MealItem {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealApiResponse {
  meals: MealItem[] | null;
}
export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  [key: string]: string | null | undefined;
}
