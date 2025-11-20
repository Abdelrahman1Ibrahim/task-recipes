import Image from "next/image";
import foodImage from "../../public/images/food.webp";
import SearchRecipes from "./Search";
import Filtration from "./Filtration";
import { Suspense } from "react";

export default function Header() {
  return (
    <header
      className="
        h-[330px] md:h-[600px] 
       
        xl:h-[700px] 
        background-[#C4C4C4]
        relative 
      "
    >
      <div className="hidden md:block">
        <Image
          src={foodImage}
          alt="Food Background"
          width={814}
          height={735}
          priority
          className="
            absolute 
            top-[-68px] 
            right-0 
            z-0
            rotate-180
            object-cover 
           
            h-full min-h-[400px] xl:min-h-[600px]
            
          "
        />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center md:justify-start">
        <div className="container mx-auto h-full">
          <div
            className="
              w-[348px] mx-auto top-6 sm:top-10
              md:w-auto h-auto 
              sticky  z-50   
              text-center md:text-left
              sm:p-5 
              max-w-full
            "
          >
            <div className="w-[331px] h-[104px] max-w-full flex flex-col items-center md:items-start">
              <h1
                className="
                  font-extrabold text-[50px] md:text-[64px] 
                 
                  xl:text-[80px]
                  whitespace-nowrap text-foreground
                "
              >
                Air Recipes
              </h1>
              <p
                className="
                  font-normal text-[16px] leading-6 
            
                  xl:text-[20px]
                  text-foreground
                "
              >
                Best Recipes for Best People
              </p>
            </div>

            <div className="flex gap-1 flex-col sm:flex-row sm:gap-4 mt-5 md:mt-14 justify-center sm:justify-start items-center ">
              <Suspense fallback={<div>Loading Search...</div>}>
                <SearchRecipes />
              </Suspense>

              <Suspense fallback={<div>Loading Filters...</div>}>
                <Filtration />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
