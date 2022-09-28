import db from 'db';
import { PermissionModel } from 'models';

const permissionsRepository = db.getRepository(PermissionModel);

export default class PermissionsRepository {
  static async getPermissions() {
    return permissionsRepository.find();
  }
}
