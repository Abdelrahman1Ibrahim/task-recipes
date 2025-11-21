"use client";

import { MealApiResponse, MealItem } from "@/types/recipes";

import { fetchApi } from "@/lib/api/fetcher";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import Link from "next/link";
import { ImageWithFallback } from "./ImageWithFallback";
import { buildApiUrl } from "@/lib/api/url";
import { LoadingRecipes } from "./LoadingRecipes";
import { useState } from "react";
import { Button } from "./ui/button";

const ITEMS_PER_LOAD = 8;

export function Recipes({ initialData }: { initialData: MealApiResponse }) {
  const searchParams = useSearchParams();

  const { url, searchQuery, filterQuery } = buildApiUrl({
    params: searchParams
  });

  const [displayCount, setDisplayCount] = useState(ITEMS_PER_LOAD);

  const {
    data: recipesQuery,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["recipes", searchQuery, filterQuery],
    queryFn: () => fetchApi<MealApiResponse>({ url }),
    initialData: initialData,
    staleTime: 60 * 1000,
    select: (data) => data?.meals
  });

  const meals = recipesQuery || [];
  const totalAvailableMeals = meals.length;

  const handleLoadMore = () => {
    setDisplayCount((prevCount) =>
      Math.min(prevCount + ITEMS_PER_LOAD, totalAvailableMeals)
    );
  };

  const handleShowLess = () => {
    setDisplayCount(ITEMS_PER_LOAD);
  };

  const isLoadMoreDisabled = displayCount >= totalAvailableMeals;
  const isShowLessVisible = displayCount > ITEMS_PER_LOAD;

  if (isLoading) return <LoadingRecipes />;
  if (isError) return <p>Error loading data.</p>;
  if (!recipesQuery || recipesQuery.length === 0) {
    return (
      <p className="text-center text-4xl font-bold text-red-600 pb-10">
        No recipes found
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 sm:p-5 container mx-auto pb-[30px] px-4">
        {meals.slice(0, displayCount).map((recipe: MealItem) => (
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

      <div className="flex justify-center gap-4 py-8">
        {isShowLessVisible && (
          <Button
            onClick={handleShowLess}
            className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Show Less
          </Button>
        )}

        <Button
          onClick={handleLoadMore}
          disabled={isLoadMoreDisabled}
          className={`px-6 py-3 font-bold rounded-lg transition duration-300 
            ${
              isLoadMoreDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-600 text-white hover:bg-orange-700"
            }`}
        >
          {isLoadMoreDisabled ? "No More Recipes" : "Load More"}
        </Button>
      </div>
    </>
  );
}
