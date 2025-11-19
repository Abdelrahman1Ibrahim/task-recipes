import Image from "next/image";
import foodImage from "../../public/images/food.webp";
import SearchRecipes from "./Search";
import Filtration from "./Filtration";
import { Suspense } from "react";

export default function Header() {
  return (
    <header className="background-[#C4C4C4]">
      <div className="h-[300px] md:h-[600px] md:flex md:justify-between">
        <div className="sticky z-10 w-[348px] h-48 top-10 mx-auto  md:top-32 md:left-[98px]">
          <div className="w-[331px] h-[104px] max-w-full flex flex-col items-center md:block">
            <h1 className="font-extrabold pl-4 md:pl-0 text-[50px] md:text-[64px] whitespace-nowrap text-foreground">
              Air Recipes
            </h1>
            <p className="font-normal  md:pl-0   text-[16px] leading-6 text-primary whitespace-[12px]">
              Best Recipes for Best People
            </p>
          </div>
          <div className="flex gap-4 mt-5 md:mt-14">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchRecipes />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
              <Filtration />
            </Suspense>
          </div>
        </div>
        <div className="relative w-full hidden md:block">
          <Image
            src={foodImage}
            alt="Food"
            width={814}
            height={735}
            priority
            className="absolute md:top-[-68px] md:right-0 z-[-1] rotate-180 object-cover h-full min-h-[400px]"
          />
        </div>
      </div>
    </header>
  );
}
