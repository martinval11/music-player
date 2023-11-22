const request = async <Response>(
  url: string,
  config: RequestInit = {}
): Promise<Response> => {
  try {
    const response = await fetch(url, config);

    if (response.ok) {
      const data = await response.json();
      return data as Response;
    } else {
      throw new Error(`Error ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(`Request failed: ${error.message}`);
  }
};

export default request;
