export interface SendEmailRequest {
  _subject: string;
  name: string;
  email: string;
  message: string;
}

export interface SendEmailResponse {
  next: string;
  ok: boolean;
}
