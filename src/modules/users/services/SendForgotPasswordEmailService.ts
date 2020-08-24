import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

// import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: IRequest): Promise<void> {}
}

export default SendForgotPasswordEmailService;
