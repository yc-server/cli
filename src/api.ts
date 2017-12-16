import * as colors from 'colors/safe';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as inquirer from 'inquirer';
import * as pluralize from 'pluralize';
import { run } from './cmd';

export async function add(flags: any) {
  const cwd = process.cwd();
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'model',
      default: 'sample',
      message: 'Model',
    },
    {
      type: 'input',
      name: 'endpoint',
      default: (answers: any) => `/api/${pluralize(answers.model)}`,
      message: 'Endpoint',
    },
    {
      type: 'input',
      name: 'path',
      default: (answers: any) => `${cwd}/src/api/${answers.model}`,
      message: 'Path',
      validate: input => !fs.existsSync(input),
    },
  ]);
  flags.model = answers.model;
  flags.endpoint = answers.endpoint;
  flags.path = answers.path;

  try {
    // mkdir
    await fse.mkdirp(flags.path);

    // rm .git
    await run(`rm -rf .git`, {
      cwd: `${cwd}/${flags.new}`,
      stdio: 'inherit',
    });

    // yarn
    await run('yarn', {
      cwd: `${cwd}/${flags.new}`,
      stdio: 'inherit',
    });

    // success
    console.log('Api', colors.cyan(flags.model), 'has been created');
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
