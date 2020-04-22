import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/Users';
// Import the config file to get the temp filepath
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    // Instantiate the users repository
    const usersRepository = getRepository(User);
    // Get the user information from the repository by the ID
    const user = await usersRepository.findOne(user_id);
    // Check if the user is logged in and exists
    if (!user) {
      throw new Error('Only authenticated users can change avatar.');
    }
    // Check if the the user already have an avatar and delete it
    if (user.avatar) {
      // Join the Directory path to the filename to get full file address
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // Use the fs function to check if the file exists
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      // If the file exists, remove it
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    // Set the avatar information on the user object in memory
    user.avatar = avatarFileName;
    // Persist information on the database
    await usersRepository.save(user);
    // Return the update user to the route
    return user;
  }
}

export default UpdateUserAvatarService;
