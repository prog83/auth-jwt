import { In } from 'typeorm';

import db from 'db';
import { UserModel } from 'models';
import { SignupDto } from 'dtos';

const userRepository = db.getRepository(UserModel);

export default class UserRepository {
  static async createUser(payload: SignupDto) {
    const user = userRepository.create(payload);
    return userRepository.save(user);
  }

  static async deleteUser(id: number) {
    return userRepository.delete({ id });
  }

  static async getUsers() {
    return userRepository.find();
  }

  static async getUser(id: number) {
    return userRepository.findOneBy({ id });
  }

  static async getUserByAccount(account: string) {
    return userRepository.findOneBy({ account });
  }
}
