import { ListFilter, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import foodImage from "../../public/images/food.webp";

export default function Header() {
  return (
    <header className="background-[#C4C4C4]">
      <div className="h-[300px] md:h-[600px] md:flex md:justify-between">
        <div className="sticky w-[348px] h-48 top-10 mx-auto  md:top-32 md:left-[98px]">
          <div className="w-[331px] h-[104px] max-w-full flex flex-col items-center md:block">
            <h1 className="font-extrabold pl-4 md:pl-0 text-[50px] md:text-[64px] whitespace-nowrap text-foreground">
              Air Recipes
            </h1>
            <p className="font-normal  md:pl-0   text-[16px] leading-6 text-primary whitespace-[12px]">
              Best Recipes for Best People
            </p>
          </div>
          <div className="flex gap-4 mt-[20px] md:mt-14">
            <div className="relative">
              <Search className="absolute w-6 h-6 top-4 left-4 text-(--shade40)" />
              <Input
                placeholder="Search"
                className="w-[276px] h-14 rounded-full border border-(--shade20) 
               pl-14 placeholder:text-(--shade40) placeholder:font-semibold placeholder:text-[16px] line-height-6 outline-none"
              />
            </div>

            <Button className="w-14 h-14 rounded-full flex items-center justify-center bg-(--base1) border border-(--shade20)">
              <ListFilter className="w-6 h-6 text-(--base0)" />
            </Button>
          </div>
        </div>
        <div className="relative w-full hidden md:block">
          <Image
            src={foodImage}
            alt="Food"
            width={814}
            height={735}
            className="absolute md:top-[-68px] md:right-0 z-[-1] rotate-180 object-cover h-full min-h-[400px]"
          />
        </div>
      </div>
    </header>
  );
}
