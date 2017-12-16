import * as args from 'args';
import { newProject } from './new';

export function startProgram(argv: string[]): any {
  args
    .option('new', 'Start a new project')
    .option('api-add', 'Add an api')
    .option('api-remove', 'Remove an api')
    .option('plugin-add', 'Add a plugin')
    .option('plugin-remove', 'Remove a plugin');

  const flags = args.parse(argv);

  if (flags.new) {
    return newProject(flags);
  }
  return flags;
}
