import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, last, retry, tap } from 'rxjs/operators';
import { HttpMethod, IHttpHeaders, IHttpRequest } from '../../common/interfaces/http';
import { SendEmailRequest, SendEmailResponse } from '../../common/interfaces/send-email';

const DEFAULT_HEADERS: IHttpHeaders = { Accept: 'application/json' };

const SEND_EMAIL_URL = 'https://formspree.io/f/mdoydqpo';

/**
 * Provides client/server communication interface via HTTP client.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private retryCount = 1;

  constructor(private http: HttpClient) {}

  private sendRequest<T>(request: IHttpRequest, retryCount = this.retryCount) {
    const { method, url, options } = request;
    return this.http.request<T>(method, url, options).pipe(
      retry(retryCount),
      tap((respone) =>
        console.log(`HttpService.request \nrequest: ${JSON.stringify(request, null, 2)} \nresponse: ${JSON.stringify(respone, null, 2)}`)
      ),
      last(),
      catchError((error) => this.handleError(method, url, options, error))
    );
  }

  private handleError(method: HttpMethod, url: string, options: object, error: any) {
    console.error('Http error', { method, url, options, error });
    return throwError(error);
  }

  private generateRequest(body: any, url: string, method: 'POST' | 'GET'): IHttpRequest {
    return {
      method,
      url,
      options: { body, headers: DEFAULT_HEADERS },
    };
  }

  sendOrderEmail(body: SendEmailRequest): Observable<SendEmailResponse> {
    const request = this.generateRequest(body, SEND_EMAIL_URL, 'POST');
    return this.sendRequest(request);
  }
}
