import ldapjs from 'ldapjs';

import LDAP from 'ldap';
import type { LdapUser } from 'types/ldap';

const client = LDAP.getInstance();

export default class LdapRepository {
  static async authenticate(user: string, password: string) {
    try {
      await LDAP.bind(`uid=${user},ou=users,dc=dotm`, password);

      return true;
    } catch (error) {
      if (error instanceof ldapjs.InvalidCredentialsError) {
        return false;
      }

      throw error;
    } finally {
      await LDAP.bindReader();
    }
  }

  static async searchUserByUid(user: string) {
    return new Promise<LdapUser | null>((resolve, reject) => {
      let candidate: LdapUser | null = null;
      const base = 'ou=users,dc=dotm';
      const options: ldapjs.SearchOptions = {
        filter: `(uid=${user})`,
        scope: 'sub',
        sizeLimit: 1,
        attributes: ['dn', 'uid', 'memberOf'],
      };

      client.search(base, options, (error, res) => {
        if (error) {
          reject(error);
          return;
        }

        res.on('searchEntry', (entry) => {
          candidate = entry.object as unknown as LdapUser;
        });

        res.on('end', () => {
          resolve(candidate);
        });

        res.on('error', (err: unknown) => {
          reject(err);
        });
      });
    });
  }
}
