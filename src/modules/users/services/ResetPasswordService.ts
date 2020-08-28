import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

// import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken?.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    user.password = password;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
