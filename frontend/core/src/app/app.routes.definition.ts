export type RemoteConfig = {
  type: 'module' | 'script';
  remoteEntry: string;
  [key: string]: unknown;
};

export type Manifest<T extends RemoteConfig = RemoteConfig> = {
  [key: string]: T;
};

export type CustomRemoteConfig = RemoteConfig & {
  exposedModule: string;
  displayName: string;
  routePath: string;
  ngModuleName: string;
};

export type CustomManifest = Manifest<CustomRemoteConfig>;
