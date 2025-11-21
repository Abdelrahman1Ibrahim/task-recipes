interface FetchApiOptions {
  url: string;
  option?: RequestInit;
}

export async function fetchApi<T = unknown>({
  url,
  option = {}
}: FetchApiOptions) {
  try {
    const response = await fetch(url, option);

    if (!response.ok) {
      throw new Error(
        `HTTP Error! status: ${response.status} ${response.statusText}`
      );
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(` [Server Fetch] Failed for URL: ${url}`);
    console.error("Error Details:", error);
    return null;
  }
}
