"use client";

import { recipe } from "@/app/types";
import fetchApi from "@/lib/api/fetcher";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5 justify-center pb-[30px]">
      {recipesQuery &&
        recipesQuery.length > 0 &&
        recipesQuery.slice(0, 8).map((recipe: recipe) => (
          <li
            key={recipe.idMeal}
            className="h-96 w-[348px] overflow-hidden mx-auto border rounded-xl shadow-[0_1px_3px_0_#00000033]"
          >
            <Link
              className="w-[348px] max-w-full"
              href={`/recipes/${recipe.idMeal}`}
            >
              <ImageWithFallback
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                width={348}
                height={196}
                className="w-full h-[196px] border transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-1"
              />
              {/* <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                width={348}
                height={196}
                className="w-full h-[196px] border transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-1"
              /> */}
            </Link>
            <div className="mx-6 mt-6">
              <h3 className="font-extrabold text-[24px] text-(--base0)">
                {recipe.strMeal}
              </h3>
              <p className="font-normal text-4 text-(--base0)">
                Such a simple, yet great recipe.
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
}
