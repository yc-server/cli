import * as authEnv from './auth';
import * as docsEnv from './docs';
import * as environment from './environment';
import * as mongodbEnv from './mongodb';
import * as staticsEnv from './statics';

const env = environment[process.env.NODE_ENV];

export const root = env.root;
export const port = env.port;
export const ip = env.ip;
export const domain = env.domain;
export const mongodb = mongodbEnv[process.env.NODE_ENV];
export const docs = docsEnv[process.env.NODE_ENV];
export const auth = authEnv[process.env.NODE_ENV];
export const statics = staticsEnv[process.env.NODE_ENV];
