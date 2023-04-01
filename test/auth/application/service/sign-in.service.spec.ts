import { mock, MockProxy } from 'jest-mock-extended';
import { AuthSignInService } from '~/auth/application/service/sign-in.service';
import { InvalidCredentialsException } from '~/auth/domain/exceptions/unauthorized.exception';
import { IJsonWebTokensService } from '~/auth/infra/contracts/json-web-tokens-service.contract';
import { IPasswordHashService } from '~/auth/infra/contracts/password-hash-service.contract';

const makeSut = () => {
  const mockAccessTokenJwtService = mock<IJsonWebTokensService>();
  const mockRefreshTokenJwtService = mock<IJsonWebTokensService>();
  const mockPasswordHashService = mock<IPasswordHashService>();
  const sut = new AuthSignInService(
    mockPasswordHashService,
    mockAccessTokenJwtService,
    mockRefreshTokenJwtService,
  );
  return {
    sut,
    mockAccessTokenJwtService,
    mockRefreshTokenJwtService,
    mockPasswordHashService,
  };
};

class ErrorExample extends Error {
  constructor() {
    super();
  }
}

describe('AuthSignInService', () => {
  let signInService: AuthSignInService;
  let passwordHash: MockProxy<IPasswordHashService>;
  let jwtAccessTokenService: MockProxy<IJsonWebTokensService>;
  let jwtRefreshTokenService: MockProxy<IJsonWebTokensService>;

  beforeEach(() => {
    const {
      sut,
      mockPasswordHashService,
      mockAccessTokenJwtService,
      mockRefreshTokenJwtService,
    } = makeSut();
    signInService = sut;
    passwordHash = mockPasswordHashService;
    jwtAccessTokenService = mockAccessTokenJwtService;
    jwtRefreshTokenService = mockRefreshTokenJwtService;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should throw when password is invalid', async () => {
    const user = {
      email: 'any-email@mail.com',
      id: 'any-id',
      passwordHash: 'hash-password',
    };
    passwordHash.compare.mockResolvedValueOnce(false);
    expect(
      signInService.signIn({
        user,
        password: 'invalid-password',
      }),
    ).rejects.toThrow(new InvalidCredentialsException());
  });

  it('should throw correct error when invalid login', async () => {
    const user = {
      email: 'any-email@mail.com',
      id: 'any-id',
      passwordHash: 'hash-password',
    };
    passwordHash.compare.mockResolvedValueOnce(false);
    expect(
      signInService.signIn({
        user,
        password: 'invalid-password',
        throwableError: ErrorExample,
      }),
    ).rejects.toThrow(new ErrorExample());
  });

  it('should return accessToken and refreshToken on success', async () => {
    const user = {
      email: 'any-email@mail.com',
      id: 'any-id',
      passwordHash: 'hash-password',
    };
    passwordHash.compare.mockResolvedValueOnce(true);
    jwtAccessTokenService.sign.mockResolvedValueOnce('any-access-token');
    jwtRefreshTokenService.sign.mockResolvedValueOnce('any-refresh-token');
    expect(
      signInService.signIn({
        user,
        password: 'hash-password',
      }),
    ).resolves.toStrictEqual({
      accessToken: 'any-access-token',
      refreshToken: 'any-refresh-token',
    });
  });
});
