import * as environment from './environment';

export const development = [
  {
    endpoint: '/static',
    path: environment.development.root + '/static',
  },
];

export const production = [
  {
    endpoint: '/static',
    path: environment.production.root + '/static',
  },
];
