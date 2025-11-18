import Recipes from "@/components/Recipes";

import fetchApi from "@/lib/api/fetcher";
import { Suspense } from "react";
// export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: Promise<{
    s?: string;
    a?: string;
  }>;
}

export default async function Home(props: HomeProps) {
  const params = await props.searchParams;

  const searchQuery = params.s || "";
  const filterQuery = params.a || "";
  const url = searchQuery
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
    : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${
        filterQuery || "Canadian"
      }`;

  const data = await fetchApi({ url });

  const meals = JSON.parse(JSON.stringify(data?.meals || []));
  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        <Recipes initialData={meals} />
      </Suspense>
    </>
  );
}

function LoadingComponent() {
  return <p>Loading list...</p>;
}
