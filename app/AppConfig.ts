export interface IAppConfig {
  supabaseUrl: string;
  supabaseKey: string;
  messageForLogin: string;
}

class AppConfig implements IAppConfig {
  public supabaseUrl!: string;
  public supabaseKey!: string;
  public messageForLogin!: string;

  public init(config: IAppConfig) {
    Object.assign(this, config);
  }
}

export default new AppConfig();
