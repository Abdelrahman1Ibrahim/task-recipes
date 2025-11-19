import { Skeleton } from "./ui/skeleton";

export default function LoadingRecipes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 justify-center pb-[30px]">
      <Skeleton className="h-96 w-[348px] max-w-full  mx-auto " />
      <Skeleton className="h-96 w-[348px] max-w-full  mx-auto " />
      <Skeleton className="h-96 w-[348px] max-w-full  mx-auto " />
    </div>
  );
}
