import { mock, MockProxy } from 'jest-mock-extended';
import { AuthSignInService } from '~/auth/application/service/sign-in.service';
import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { InvalidCredentialsException } from '~/auth/domain/exceptions/unauthorized.exception';
import { makeUserFaker } from '../../../users/faker/user.faker'; //TODO: needs to find a fix for this shit
import { IFindUserByEmail } from '~/users/application/services/contracts/find-user-by-email.contract';
import { User } from '~/users/domain/entities/user.entity';
import { UserNotFoundException } from '~/users/domain/exceptions/user-not-found.exception';

const makeSut = () => {
  const mockFindUser = mock<IFindUserByEmail>();
  const mockAuthSignInService = mock<AuthSignInService>();

  const sut = new SignInUseCase(mockFindUser, mockAuthSignInService);

  return {
    sut,
    mockFindUser,
    mockAuthSignInService,
  };
};

describe('SignInUseCase', () => {
  let signInUseCase: SignInUseCase;
  let findUser: MockProxy<IFindUserByEmail>;
  let authSignInService: MockProxy<AuthSignInService>;

  beforeEach(() => {
    const { sut, mockFindUser, mockAuthSignInService } = makeSut();
    signInUseCase = sut;
    findUser = mockFindUser;
    authSignInService = mockAuthSignInService;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should throw a UserNotFoundException when user do not exists', async () => {
      findUser.findByEmail.mockRejectedValueOnce(new UserNotFoundException());
      expect(
        signInUseCase.signIn({
          email: 'any-email@email.com',
          password: 'any-password',
        }),
      ).rejects.toThrow(new UserNotFoundException());
    });

    it('should throw a when password missmatch', async () => {
      const user: User = makeUserFaker();
      findUser.findByEmail.mockResolvedValueOnce(user);
      authSignInService.signIn.mockRejectedValueOnce(
        new InvalidCredentialsException(),
      );
      expect(
        signInUseCase.signIn({
          email: user.email,
          password: 'any-password',
        }),
      ).rejects.toThrow(new InvalidCredentialsException());
    });

    it('should return accessToken and refresh token on success', async () => {
      const user: User = makeUserFaker();
      findUser.findByEmail.mockResolvedValueOnce(user);
      authSignInService.signIn.mockResolvedValueOnce({
        accessToken: 'any-access-token',
        refreshToken: 'any-refresh-token',
      });

      expect(
        signInUseCase.signIn({
          email: user.email,
          password: 'any-password',
        }),
      ).resolves.toStrictEqual({
        accessToken: 'any-access-token',
        refreshToken: 'any-refresh-token',
      });
    });
  });
});
