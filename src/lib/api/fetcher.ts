interface FetchApiOptions {
  url: string;
  option?: RequestInit;
}

export default async function fetchApi({ url, option = {} }: FetchApiOptions) {
  try {
    const response = await fetch(url, option);

    if (!response.ok) {
      throw new Error(
        `HTTP Error! status: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(` [Server Fetch] Failed for URL: ${url}`);
    console.error("Error Details:", error);
    return null;
  }
}
