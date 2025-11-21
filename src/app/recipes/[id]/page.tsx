import { ImageWithFallback } from "@/components/ImageWithFallback";
import { fetchApi } from "@/lib/api/fetcher";
import { Meal } from "@/types/recipes";
import {
  extractIngredients,
  extractInstructions
} from "@/utils/meal-transformers";
import Link from "next/link";
import { notFound } from "next/navigation";

interface MealResponse {
  meals: Meal[] | null;
}

interface RecipeDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function RecipeDetails({ params }: RecipeDetailsProps) {
  const id = (await params).id;

  const data = await fetchApi<MealResponse>({
    url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    option: {
      next: { revalidate: 3600 }
    }
  });

  console.log(data);

  if (!data || !data.meals || data.meals.length === 0) {
    notFound();
  }

  const recipe: Meal = data.meals[0];
  const ingredientsList = extractIngredients(recipe);
  const instructionsList = extractInstructions(recipe);

  return (
    <section className="container pb-[30px] px-5">
      <div className="flex justify-end mb-4">
        <Link
          href="/"
          className="px-4 py-2 border bg-white shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 rounded-md transition duration-150"
        >
          Home
        </Link>
      </div>
      <div className=" flex flex-col md:flex-row gap-10 justify-between ">
        <div className="md:w-1/2">
          <h2 className="font-extrabold text-[40px] leading-tight">
            {recipe.strMeal}
          </h2>
          <p className="text-[16px] leading-6 text-gray-600 pt-2.5">
            Such a simple, yet great recipe.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4 border-b mb-6 text-sm">
            <span className="flex items-center text-green-600 font-bold">
              <span className="text-xl mr-1">🍳</span>
              {recipe.strCategory || "Easy"}
            </span>

            <span className="flex items-center text-gray-500 font-medium">
              <span className="text-xl mr-1">🕒</span>
              35 min
            </span>

            <span className="flex items-center text-gray-500 font-medium">
              <span className="text-xl mr-1">🔥</span>
              450 Kcal
            </span>

            <span className="flex items-center text-gray-500 font-medium">
              <span className="text-xl mr-1">🌍</span>
              {recipe.strArea || "N/A"}
            </span>
          </div>

          <h3 className="font-extrabold text-[24px] leading-7 py-5">
            Ingredients
          </h3>
          <ul className="flex flex-col gap-2">
            {ingredientsList.map((content, index) => (
              <li
                key={index}
                className="relative pl-5 text-[16px] leading-6 text-gray-700 before:content-[''] before:w-1.5 before:h-1.5 before:bg-black before:rounded-full before:absolute before:left-0 before:top-2.5"
              >
                {content}
              </li>
            ))}
          </ul>

          <h3 className="font-extrabold text-[24px] leading-7 py-5 mt-6">
            Instructions
          </h3>
          <ol className="flex flex-col gap-4 text-[16px] leading-6 text-gray-700">
            {instructionsList.map((step, index) => (
              <li
                key={index}
                className="relative pl-5 before:content-[attr(data-step)] before:font-bold before:absolute before:left-0 before:top-0"
                data-step={`${index + 1}.`}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="md:w-1/2 relative">
          {recipe.strYoutube ? (
            <Link
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="block shadow-xl hover:shadow-2xl transition-shadow duration-300 relative rounded-lg overflow-hidden"
            >
              <ImageWithFallback
                width={532}
                height={355}
                src={recipe.strMealThumb}
                alt={`Picture of ${recipe.strMeal}`}
                className="object-cover w-full h-auto"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-red-600/80 rounded-full opacity-90 hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 3l12 9-12 9V3z" />
                </svg>
              </div>
            </Link>
          ) : (
            <ImageWithFallback
              width={532}
              height={355}
              src={recipe.strMealThumb}
              alt={`Picture of ${recipe.strMeal}`}
              className="rounded-lg object-cover w-full h-auto shadow-xl"
            />
          )}
        </div>
      </div>
    </section>
  );
}
