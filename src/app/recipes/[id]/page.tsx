import { ImageWithFallback } from "@/components/ImageWithFallback";

import fetchApi from "@/lib/api/fetcher";

import Link from "next/link";

export default async function RecipeDetails({
  params
}: {
  params: { id: string };
}) {
  const { id } = await params;
  console.log("Fetching recipe with ID:", id);

  if (!id) {
    return (
      <section className="container py-10 text-center">
        <h1 className="text-4xl font-bold text-red-600">Invalid Recipe ID</h1>
        <p className="mt-2 text-gray-500">
          Please provide a valid ID in the URL
        </p>
      </section>
    );
  }

  const data = await fetchApi({
    url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  });

  if (!data) {
    return (
      <section className="container py-10 text-center">
        <h1 className="text-4xl font-bold text-red-600">No Recipe Found</h1>
        <p className="mt-2 text-gray-500">
          Please try again with a different ID
        </p>
      </section>
    );
  }

  const recipe = data?.meals[0] || [];

  return (
    <section className="container pb-[30px] px-5">
      <div className="flex justify-end mb-2">
        <Link
          href="/"
          className="px-4 py-2   border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md"
        >
          Home
        </Link>
      </div>
      <div className=" flex flex-col md:flex-row gap-5 justify-between ">
        <div>
          <h2 className="font-extrabold text-[40px] leading-12">
            {recipe.strMeal}
          </h2>
          <p className="text-[16px] leading-6 text-(--base0) pt-2.5">
            Such a simple, yet great recipe.
          </p>
          <h3 className="font-extrabold text-[24px] leading-7 py-5">
            Ingredients
          </h3>
          <ul className="flex flex-col gap-2">
            <li className="relative pl-5 text-[16px] leading-6 text-(--base0) before:content-[''] before:w-1.5 before:h-1.5 before:bg-black before:rounded-full before:absolute before:left-0 before:top-2.5">
              {" "}
              {recipe?.strIngredient1 || "Dummy text"}
            </li>
            <li className="relative pl-5 text-[16px] leading-6 text-(--base0) before:content-[''] before:w-1.5 before:h-1.5 before:bg-black before:rounded-full before:absolute before:left-0 before:top-2.5">
              {" "}
              {recipe?.strIngredient2 || "Dummy text"}
            </li>
            <li className="relative pl-5 text-[16px] leading-6 text-(--base0) before:content-[''] before:w-1.5 before:h-1.5 before:bg-black before:rounded-full before:absolute before:left-0 before:top-2.5">
              {" "}
              {recipe?.strIngredient3 || "Dummy text"}
            </li>
            <li className="relative pl-5 text-[16px] leading-6 text-(--base0) before:content-[''] before:w-1.5 before:h-1.5 before:bg-black before:rounded-full before:absolute before:left-0 before:top-2.5">
              {" "}
              {recipe?.strIngredient4 || "Dummy text"}
            </li>
            <li className="relative pl-5 text-[16px] leading-6 text-(--base0) before:content-[''] before:w-1.5 before:h-1.5 before:bg-black before:rounded-full before:absolute before:left-0 before:top-2.5">
              {" "}
              {recipe?.strIngredient5 || "Dummy text"}
            </li>
            <li className="relative pl-5 text-[16px] leading-6 text-(--base0) before:content-[''] before:w-1.5 before:h-1.5 before:bg-black before:rounded-full before:absolute before:left-0 before:top-2.5">
              {" "}
              {recipe?.strIngredient6 || "Dummy text"}
            </li>
            <li className="relative pl-5 text-[16px] leading-6 text-(--base0) before:content-[''] before:w-1.5 before:h-1.5 before:bg-black before:rounded-full before:absolute before:left-0 before:top-2.5">
              {recipe?.strIngredient7 || "Dummy text"}
            </li>
          </ul>
        </div>
        <div>
          <ImageWithFallback
            width={532}
            height={355}
            src={recipe.strMealThumb}
            alt="Picture of the meal"
          />
          {/* <Image
            src={recipe.strMealThumb}
            alt="Picture of the meal"
            width={532}
            height={355}
          /> */}
        </div>
      </div>
    </section>
  );
}
