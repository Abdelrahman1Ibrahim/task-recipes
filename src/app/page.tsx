import FiltrationList from "@/components/FilterationList";

export async function fetchRecipes() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian",
      {
        cache: "no-store"
      }
    );
    console.log(response);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);

    return null;
  }
}

export default async function Home() {
  const data = await fetchRecipes();

  return (
    <>
      <FiltrationList initialData={data?.meals} />
    </>
  );
}
