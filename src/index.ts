import * as args from 'args';
import { newProject } from './new';
import { add as addApi } from './api';
import { add as addPlugin, remove as removePlugin } from './plugin';

export function startProgram(argv: string[]): any {
  args
    .option('new', 'Start a new project')
    .option('api-add', 'Add an api')
    .option('plugin-add', 'Add a plugin')
    .option('plugin-remove', 'Remove a plugin');

  const flags = args.parse(argv);

  if (flags.n) return newProject(flags);
  if (flags.a) return addApi(flags);
  if (flags.p) return addPlugin(flags);
  if (flags.P) return removePlugin(flags);
  return flags;
}
