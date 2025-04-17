import { EmailSender } from '../../Domain/Emails/EmailSender';

export class ConsoleEmailSender implements EmailSender {
  FROM = 'no-reply@leadtech';
  async send(to: string, subject: string, body: string) {
    console.log(`from: Leadtech <${this.FROM}>`);
    console.log(`to: ${to}`);
    console.log(`subject: ${subject}`);
    console.log(`html: ${body}`);
    return Promise.resolve(undefined);
  }
}
