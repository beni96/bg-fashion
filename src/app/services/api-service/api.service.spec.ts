import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SendEmailRequest, SendEmailResponse } from 'src/app/common/interfaces/send-email';
import { ApiService } from './api.service';

const SEND_EMAIL_RESPONSE: SendEmailResponse = { ok: true, next: '' };

describe('ApiService', () => {
  let service: ApiService;
  let httpmcok: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpmcok = jasmine.createSpyObj('HttpClient', ['request']);
    httpmcok.request.and.returnValue(of(SEND_EMAIL_RESPONSE));
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: HttpClient, useValue: httpmcok }],
    });

    service = TestBed.inject(ApiService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should get observable on sending email', (done) => {
    const request: SendEmailRequest = { email: 'user@gmail.com', _subject: 'subject', name: 'user', message: '' };
    service.sendOrderEmail(request).subscribe((response) => {
      expect(response).toEqual(SEND_EMAIL_RESPONSE);
      done();
    });
  });
});
