export interface LdapUser {
  dn: string;
  uid: string;
  memberOf: string | Array<string>;
}
