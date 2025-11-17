interface FetchApiOptions {
  url: string;
  option?: RequestInit;
}
export default async function fetchApi({ url, option = {} }: FetchApiOptions) {
  try {
    const response = await fetch(url, option);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
