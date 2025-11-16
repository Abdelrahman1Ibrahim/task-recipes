"use client";

import { recipe } from "@/app/types";
import Image from "next/image";
import { useState } from "react";

interface FiltrationListProps {
  initialData: recipe[];
}

export default function FiltrationList({ initialData }: FiltrationListProps) {
  const [recipes, setRecipes] = useState<recipe[]>(initialData || []);

  console.log("recipes", recipes);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
      {[...recipes].slice(0, 8).map((recipe) => {
        return (
          <li
            key={recipe.idMeal}
            className="h-96 w-[348px] overflow-hidden mx-auto border rounded-xl shadow-[0_1px_3px_0_#00000033]"
          >
            <div className="w-[348px]  max-w-full ">
              <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                width={348}
                height={196}
                className="w-full h-[196px] border "
              />
            </div>
            <div className="mx-6 mt-6">
              <h3 className="font-extrabold text-[24px] line-height-[28px] text-(--base0)">
                {recipe.strMeal}
              </h3>
              <p className="font-normal text-4 line-height-[24px] text-(--base0)">
                Such a simple, yet great recipe.
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
