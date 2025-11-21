type SearchParamsObject = { s?: string | string[]; a?: string | string[] };
type UrlParamsInput = SearchParamsObject | URLSearchParams;

export function buildApiUrl({ params }: { params: UrlParamsInput }) {
  let s_value: string | null | undefined;
  let a_value: string | null | undefined;

  if (params instanceof URLSearchParams) {
    s_value = params.get("s");
    a_value = params.get("a");
  } else {
    s_value = Array.isArray(params.s) ? params.s[0] : params.s;
    a_value = Array.isArray(params.a) ? params.a[0] : params.a;
  }

  const searchQuery = s_value || "";
  const filterQuery = a_value || "";

  const url = searchQuery
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
    : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${
        filterQuery || "Canadian"
      }`;

  return { url, searchQuery, filterQuery };
}
