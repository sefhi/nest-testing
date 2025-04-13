export class UserName {
  constructor(public readonly value: string) {
    this.ensureNameIsValid();
  }

  private ensureNameIsValid() {
    if (this.value.length < 3) {
      throw new Error('name must be at least 3 characters long');
    }

    if (this.value.length > 50) {
      throw new Error('name not must be longer than 50 characters');
    }
  }
}
