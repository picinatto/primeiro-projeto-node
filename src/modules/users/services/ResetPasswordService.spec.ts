// import AppError from '@shared/errors/AppError';

// TODO: PAROU EM 5 MINUTPS

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository';

import ResetPasswordService from './ResetPasswordService';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  // Instantiate each repo and service before each it
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updateUser = await fakeUsersRepository.findById(user.id);

    expect(updateUser?.password).toBe('123123');
  });
});
