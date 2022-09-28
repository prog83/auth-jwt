export default class ValidatorGroups {
  public static readonly CREATE = 'CREATE';

  public static readonly READ = 'READ';

  public static readonly UPDATE = 'UPDATE';

  public static all = () => [ValidatorGroups.CREATE, ValidatorGroups.READ, ValidatorGroups.UPDATE];
}
