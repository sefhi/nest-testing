import { UserName } from '../../../../../src/Users/Domain/ValueObjects/UserName';

describe('UserName Value Object', () => {
  it('should valid name', () => {
    // GIVEN
    const validNames = [
      'John Doe',
      'Jane Smith',
      'Alice Johnson',
      'Bob Brown',
      'Charlie Black',
    ];

    // WHEN & THEN
    validNames.forEach((value) => {
      const name = new UserName(value);
      expect(name).toBeDefined();
      expect(name.value).toBe(value);
    });
  });

  it('should throw error when name is too short', () => {
    // GIVEN
    const shortNames = ['ab', 'a', ''];

    // WHEN & THEN
    shortNames.forEach((value) => {
      expect(() => {
        new UserName(value);
      }).toThrowError('name must be at least 3 characters long');
    });
  });

  it('should throw error when name is too long', () => {
    // GIVEN
    const longNames = [
      'a'.repeat(51),
      'this is a very long name that exceeds the maximum length of fifty characters',
    ];

    // WHEN & THEN
    longNames.forEach((value) => {
      expect(() => {
        new UserName(value);
      }).toThrowError('name not must be longer than 50 characters');
    });
  });
});
