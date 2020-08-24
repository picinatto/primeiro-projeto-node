import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
    );

    // Add test....
  });
});
