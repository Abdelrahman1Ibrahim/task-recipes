"use client";

import { recipe } from "@/app/types";

import fetchApi from "@/lib/api/fetcher";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import LoadingRecipes from "./LoadingRecipes";
import Link from "next/link";
import { ImageWithFallback } from "./ImageWithFallback";

interface FiltrationListProps {
  initialData: recipe[];
}

export default function Recipes({ initialData }: FiltrationListProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("s") || "";
  const filterQuery = searchParams.get("a") || "";

  const url = searchQuery
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
    : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${
        filterQuery || "Canadian"
      }`;

  const {
    data: recipesQuery,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["recipes", searchQuery, filterQuery],
    queryFn: () => fetchApi({ url }).then((data) => data?.meals),
    initialData: initialData
  });

  console.log(recipesQuery);

  if (isLoading) return <LoadingRecipes />;
  if (isError) return <p>Error loading data.</p>;

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 sm:p-5 container mx-auto  pb-[30px] px-4">
        {recipesQuery &&
          recipesQuery.length > 0 &&
          recipesQuery.slice(0, 8).map((recipe: recipe) => (
            <li
              key={recipe.idMeal}
              className="
              h-96
                overflow-hidden 
                border rounded-xl 
                shadow-[0_1px_3px_0_#00000033]
              "
            >
              <Link
                className="w-full h-full block"
                href={`/recipes/${recipe.idMeal}`}
              >
                <ImageWithFallback
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  width={348}
                  height={196}
                  className="w-full h-[196px] object-cover transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-1"
                />

                <div className="mx-6 mt-6">
                  <h3 className="font-extrabold text-[24px] text-(--base0)">
                    {recipe.strMeal}
                  </h3>
                  <p className="font-normal text-4 text-(--base0)">
                    Such a simple, yet great recipe.
                  </p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
      {(!recipesQuery || recipesQuery?.length == 0) && (
        <p className="text-center text-4xl font-bold text-red-600 pb-10">
          No recipes found
        </p>
      )}
    </>
  );
}
