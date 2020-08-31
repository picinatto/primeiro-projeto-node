import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'updated-test',
    });

    expect(user.avatar).toBe('updated-test');
  });

  it('should not be able to update avatar of non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'updated-test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the file if the avatar is existent', async () => {
    // Createing spy to know if the delete file function was triggered
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'file1.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'file2.jpg',
    });

    // Check if the function deleteFile was called with file1.jpg parameter
    expect(deleteFile).toHaveBeenCalledWith('file1.jpg');
    // Check if the avatar was updated to the user
    expect(user.avatar).toBe('file2.jpg');
  });
});
