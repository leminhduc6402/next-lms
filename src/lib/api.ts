import queryString from "query-string";

export const sendRequest = async <T>(props: IRequest): Promise<T> => {
  const {
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  let { url } = props;

  if (queryParams && Object.keys(queryParams).length > 0) {
    url += `?${queryString.stringify(queryParams)}`;
  }

  const options: RequestInit = {
    method,
    headers: new Headers({ "Content-Type": "application/json", ...headers }),
    ...nextOption,
  };

  if (body) options.body = JSON.stringify(body);
  if (useCredentials) options.credentials = "include";

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    if (res.ok) return json as T;

    return {
      statusCode: res.status,
      message: json?.message ?? "",
      error: json?.error ?? "",
    } as T;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new Error("Network error");
  }
};

export const sendRequestFile = async <T>(props: IRequest): Promise<T> => {
  const {
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  let { url } = props;

  if (queryParams && Object.keys(queryParams).length > 0) {
    url += `?${queryString.stringify(queryParams)}`;
  }

  const options: RequestInit = {
    method,
    headers: new Headers(headers),
    body: body as BodyInit, // assuming this is FormData or Blob
    ...nextOption,
  };

  if (useCredentials) options.credentials = "include";

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    if (res.ok) return json as T;

    return {
      statusCode: res.status,
      message: json?.message ?? "",
      error: json?.error ?? "",
    } as T;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new Error("Network error");
  }
};
