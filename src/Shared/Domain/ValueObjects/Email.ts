export class Email {
  constructor(public readonly value: string) {
    Email.ensureIsValidEmail(value);
  }
  static ensureIsValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    return true;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
