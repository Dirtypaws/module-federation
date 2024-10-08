export type RemoteConfig = {
  type: 'module' | 'script';
  remoteEntry: string;
  [key: string]: unknown;
};

export type Manifest<T extends RemoteConfig = RemoteConfig> = {
  [key: string]: T;
};

export type NavigationPath = {
  /*** The qualified route for the path */
  path?: string;
  /*** The display name for the path */
  display: string;
  /*** Routes that appear as children to the path */
  subRoutes?: NavigationPath[];
  /*** If the route is only available if a specific flag is set */
  flag?: string;
};

export type CustomRemoteConfig = RemoteConfig & {
  /*** The unique identifier of the application */
  id: string;
  /*** A list of paths the hub application should render */
  navigationRoutes: NavigationPath[];
  /*** The entryPoint module */
  exposedModule: string;
  /*** The Module name to register the path */
  ngModuleName: string;
  /*** Required flags for this module to be served */
  flags?: string[];
  /*** The version of the application */
  version: string;
  /*** All roles must be present to serve   */
  roles?: string[];
  /*** If any roles match the users roles the module will be served  */
  anyOfRoles?: string[];
  routePath: string;
};

export type CustomManifest = Manifest<CustomRemoteConfig>;
