import db from 'db';
import { ActivationCodeModel } from 'models';

const activationCodeRepository = db.getRepository(ActivationCodeModel);

export default class ActivationCodeRepository {
  static async createCode(payload: { userId: number; code: string }) {
    const code = activationCodeRepository.create(payload);
    return activationCodeRepository.save(code);
  }

  static async deleteCodeByUser(userId: number) {
    return activationCodeRepository.delete({ userId });
  }
}
