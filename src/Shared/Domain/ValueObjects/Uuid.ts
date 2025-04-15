import { validate as uuidValidate } from 'uuid';

export class Uuid {
  constructor(public readonly value: string) {
    this.ensureIsValidId(value);
  }

  ensureIsValidId(id: string): void {
    if (!uuidValidate(id)) {
      throw new Error(`Invalid Uuid: ${id}`);
    }
  }
}
