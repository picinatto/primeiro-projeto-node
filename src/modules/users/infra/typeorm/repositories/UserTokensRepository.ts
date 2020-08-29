import { getRepository, Repository } from 'typeorm';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

import UserToken from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    console.log('user_id', user_id);
    const userToken = await this.ormRepository.create({
      user_id,
    });

    console.log('Dentro de userToken repo, userToken_ID: ', userToken.id);
    console.log('Dentro de userToken repo, userToken_token: ', userToken.token);

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokensRepository;
