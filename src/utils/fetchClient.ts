/* eslint-disable @typescript-eslint/no-explicit-any */
const URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
  token: string = '',
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = data;
    options.headers = {
      'token': token,
    };
  }

  return wait(300)
    .then(() => fetch(URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any, token: any) => request<T>(url, 'POST', data, token),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};