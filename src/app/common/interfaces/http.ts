export type HttpMethod = 'GET' | 'POST';

export interface IHttpHeaders {
  [header: string]: string | string[];
}

export interface IHttpRequest {
  method: HttpMethod;
  url: string;
  options?: {
    body?: object;
    headers?: IHttpHeaders;
  };
}
