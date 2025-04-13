import { Email } from '../../../../../src/Shared/Domain/ValueObjects/Email';

describe('Email Value Object', () => {
  it('Should valid emails', () => {
    // GIVEN
    const validEmails = [
      'test@example.com',
      'usuario.nombre@subdominio.dominio.com',
      'user-name@domain.co',
      'user123@example.org',
      'first.last@example.io',
    ];

    // WHEN & THEN
    validEmails.forEach((value) => {
      const email = new Email(value);
      expect(email).toBeDefined();
      expect(email.value).toBe(value);
    });
  });

  it('Should throw error when invalid email', () => {
    //GIVEN
    const invalidEmails = [
      'plainaddress',
      '@missingusername.com',
      'username@.com',
      'username@domain,com',
    ];

    // WHEN & THEN
    invalidEmails.forEach((value) => {
      expect(() => {
        new Email(value);
      }).toThrowError('Invalid email format');
    });
  });
});
