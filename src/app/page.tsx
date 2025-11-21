import { Recipes } from "@/components/Recipes";
import { fetchApi } from "@/lib/api/fetcher";
import { buildApiUrl } from "@/lib/api/url";
import { MealApiResponse } from "@/types/recipes";
// export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: Promise<{
    s?: string;
    a?: string;
  }>;
}

export default async function Home(props: HomeProps) {
  const params = await props.searchParams;
  const { url } = buildApiUrl({ params });
  const data = await fetchApi<MealApiResponse>({
    url
  });

  return (
    <>
      <Recipes initialData={data || { meals: [] }} />
    </>
  );
}
