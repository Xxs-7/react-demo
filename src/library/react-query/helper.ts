const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const API_ROOT = "http://localhost:8001";

export const fetchData = async (url: string, ms: number = 2000) => {
  try {
    const response = await fetch(`${API_ROOT}/${url}`);
    if (!!ms) await delay(ms);

    const { status, ok } = response;
    if (!!ok && status === 200) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const HEADERS_DEFAULT = {
  "Content-Type": "application/json; charset=utf-8",
  Accept: "application/json",
};

export type PersonDataType = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export const createNew = async (uri: string, payload: PersonDataType, ms: number = 3000) => {
  const options = {
    method: "POST",
    headers: HEADERS_DEFAULT,
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${API_ROOT}/${uri}`, options);
  await delay(ms);
  return await response.json();
};

export const remove = async (uri: string, id: string) => {
  const options = {
    method: "DELETE",
    headers: HEADERS_DEFAULT,
  };

  const response = await fetch(`${API_ROOT}/${uri}/${id}`, options);
  return await response.json();
};
