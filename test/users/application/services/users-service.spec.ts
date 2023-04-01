import { MockProxy, mock } from 'jest-mock-extended';
import { makeUserFaker } from '../../faker/user.faker'; //TODO: needs to find a fix for this shit
import { UsersService } from '~/users/application/services/users.service';
import { UserNotFoundException } from '~/users/domain/exceptions/user-not-found.exception';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

import { User } from '~/users/domain/entities/user.entity';

const makeSut = () => {
  const mockUserRepository = mock<IUserRepository>();
  const sut = new UsersService(mockUserRepository);
  return {
    sut,
    mockUserRepository,
  };
};

class DummyError extends Error {
  constructor() {
    super('DummyError');
  }
}

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: MockProxy<IUserRepository>;

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const { sut, mockUserRepository } = makeSut();

    usersService = sut;
    userRepository = mockUserRepository;
  });

  describe('findByEmail', () => {
    it('should throw an error when user is not found', async () => {
      userRepository.findByEmail.mockResolvedValueOnce(null);
      expect(
        usersService.findByEmail({ email: 'any-email@email.com' }),
      ).rejects.toThrow(new UserNotFoundException());
    });

    it('should throw an specific error when user is not found', async () => {
      userRepository.findByEmail.mockResolvedValueOnce(null);
      expect(
        usersService.findByEmail({
          email: 'any-email@email.com',
          throwableError: DummyError,
        }),
      ).rejects.toThrow(new DummyError());
    });

    it('should return an user when success', async () => {
      const user = makeUserFaker();
      userRepository.findByEmail.mockResolvedValueOnce(user);
      expect(
        usersService.findByEmail({ email: user.email }),
      ).resolves.toBeInstanceOf(User);
    });
  });
});
