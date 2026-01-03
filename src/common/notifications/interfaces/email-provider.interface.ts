export interface IEmailProvider {
  sendEmail(to: string, subject: string, htmlBody: string): Promise<void>;
}
