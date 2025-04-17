import { v7 as uuidv7, validate as uuidValidate } from 'uuid';

export class Uuid {
  constructor(public readonly value: string) {
    this.ensureIsValidId(value);
  }

  private ensureIsValidId(id: string): void {
    if (!this.validate(id)) {
      throw new Error(`Invalid Uuid: ${id}`);
    }
  }

  validate(id: string): boolean {
    return uuidValidate(id);
  }

  toString(): string {
    return this.value;
  }

  static generate(): Uuid {
    return new Uuid(uuidv7());
  }
}
