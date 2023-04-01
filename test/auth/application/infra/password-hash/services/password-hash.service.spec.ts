import bcrypt from 'bcrypt';
import { PasswordHashService } from '~/auth/infra/password-hash/password-hash.service';

const sut = new PasswordHashService();

afterAll(() => {
  jest
    .spyOn(bcrypt, 'hash')
    .mockImplementation((_pass, _salt, cb) => cb(null, 'password'));
});

describe('PasswordHashService', () => {
  describe('hashPassword', () => {
    it('should return a hash on success', async () => {
      expect(sut.hashPassword({ password: 'any_password' })).resolves.toMatch(
        /^\$2b\$12\$/,
      );
    });
  });

  describe('compare', () => {
    it('should return true when compare succeeds', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
      expect(sut.compare({ plain: 'any_password', hash: 'any_hash' })).toBe(
        true,
      );
    });
    it('should return false when compare fails', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);
      expect(sut.compare({ plain: 'any_password', hash: 'any_hash' })).toBe(
        false,
      );
    });
  });
});
