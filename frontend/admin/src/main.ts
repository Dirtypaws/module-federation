import { initFederation } from '@angular-architects/native-federation';

//todo: make this dynamic
initFederation()
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
