export interface IAppConfig {
  supabaseUrl: string;
  supabaseKey: string;
  messageForLogin: string;

  isForSepolia: boolean;
}

class AppConfig implements IAppConfig {
  public supabaseUrl!: string;
  public supabaseKey!: string;
  public messageForLogin!: string;
  public isForSepolia!: boolean;

  public init(config: IAppConfig) {
    Object.assign(this, config);
  }
}

export default new AppConfig();
