import * as colors from 'colors/safe';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as inquirer from 'inquirer';
import { run } from './cmd';

export async function newProject(flags: any) {
  const cwd = process.cwd();
  if (flags.new === true) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'new',
        default: 'helloWorld',
        message: 'Project dir',
      },
      {
        type: 'confirm',
        name: 'overwrite',
        default: false,
        message: answers => colors.red(`Overwrite ${cwd}/${answers.new}`),
        when: answers => fs.existsSync(`${cwd}/${answers.new}`),
      },
    ]);
    flags.new = answers.new;
    flags.overwrite = answers.overwrite;
  }

  if (flags.overwrite === false) return false;

  try {
    // remove exists
    if (flags.overwrite === true) {
      await fse.remove(`${cwd}/${flags.new}`);
    }

    // clone git repo
    await run(`git clone https://github.com/yc-server/base.git ${flags.new}`, {
      cwd: cwd,
      stdio: 'inherit',
    });

    // rm .git
    await fse.remove(`${cwd}/${flags.new}/.git`);

    // yarn
    await run('yarn', {
      cwd: `${cwd}/${flags.new}`,
      stdio: 'inherit',
    });

    // success
    console.log('Project', colors.cyan(flags.new), 'has been created');
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
