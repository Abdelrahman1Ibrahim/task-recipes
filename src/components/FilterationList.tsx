"use client";

import { recipe } from "@/app/types";
import fetchApi from "@/lib/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface FiltrationListProps {
  initialData: recipe[];
}

export default function FiltrationList({ initialData }: FiltrationListProps) {
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
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
      {recipesQuery.slice(0, 8).map((recipe: recipe) => (
        <li
          key={recipe.idMeal}
          className="h-96 w-[348px] overflow-hidden mx-auto border rounded-xl shadow-[0_1px_3px_0_#00000033]"
        >
          <div className="w-[348px] max-w-full">
            <Image
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              width={348}
              height={196}
              className="w-full h-[196px] border"
            />
          </div>
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
