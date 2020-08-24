import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
    );

    const fakeMailProvider = new FakeMailProvider();

    // Createing spy to know if the sendMail function was triggered
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    sendForgotPasswordEmail.execute({ email: 'johndoe@example.com' });

    // Check if the function deleteFile was called with file1.jpg parameter
    expect(sendMail).toHaveBeenCalledWith('johndoe@example.com');
  });
});
