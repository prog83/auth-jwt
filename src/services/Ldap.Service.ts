/* eslint-disable class-methods-use-this */
import { PermissionsRepository } from 'repositories';
import type { LdapUser } from 'types/ldap';
import type { MultiDictionary } from 'types/common';

export default class LdapService {
  private static getCn(dn: string) {
    const cn = dn.split(',').find((item) => {
      const [attr] = item.split('=');
      return attr === 'cn';
    });

    if (!cn) {
      return null;
    }

    const [, value] = cn.split('=');

    return value;
  }

  private static getLdapGroups({ memberOf }: LdapUser) {
    const groups: Array<string> = [];

    if (typeof memberOf === 'string') {
      const cn = LdapService.getCn(memberOf);
      if (cn) {
        groups.push(cn);
      }
    }

    if (Array.isArray(memberOf)) {
      memberOf.forEach((item) => {
        const cn = LdapService.getCn(item);
        if (cn) {
          groups.push(cn);
        }
      });
    }

    return groups;
  }

  static async getGroups(account: LdapUser) {
    const groups = LdapService.getLdapGroups(account);
    const dictionary = await PermissionsRepository.getPermissions();

    const permissions = groups.map((group) => {
      const candidate = dictionary.find(({ alias }) => alias === group);
      if (!candidate) return null;
      return { id: candidate.id, label: candidate.label };
    });

    return permissions.filter((i) => Boolean(i)) as MultiDictionary;
  }
}
