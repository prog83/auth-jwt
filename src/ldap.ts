import ldapjs from 'ldapjs';

let client: ldapjs.Client;

export default class LDAP {
  private static create() {
    client = ldapjs.createClient({
      url: process.env.LDAP_URL!,
    });

    client.on('error', (error: unknown) => {
      throw error;
    });
  }

  static async bind(dn: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      client.bind(dn, password, (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  static async bindReader() {
    await LDAP.bind(`cn=${process.env.LDAP_READONLY_USER_USERNAME},dc=dotm`, process.env.LDAP_READONLY_USER_PASSWORD!);
  }

  static async initialize() {
    if (!client) {
      LDAP.create();
      await LDAP.bindReader();
    }
  }

  static getInstance() {
    if (!client) {
      LDAP.initialize();
    }

    return client;
  }
}
