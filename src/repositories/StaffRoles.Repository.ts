import db from 'db';
import { StaffRoleModel } from 'models';

const staffRolesRepository = db.getRepository(StaffRoleModel);

export default class StaffRolesRepository {
  static async getStaffRoles() {
    return staffRolesRepository.find();
  }
}
