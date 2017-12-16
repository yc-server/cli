import * as colors from 'colors/safe';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as inquirer from 'inquirer';
import * as lodash from 'lodash';
import * as rp from 'request-promise';
import { run } from './cmd';

export async function add(flags: any) {
  const cwd = process.cwd();
  const exists = await loadExistsPlugins();
  console.log(colors.yellow('Plugins installed:'));
  console.log('[', colors.green(exists.join(', ')), ']');
  console.log(colors.yellow('Fetching plugins list from github.com'));
  const choices = await requestPlugins();
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'plugin',
      choices: lodash.difference(choices, exists),
      message: 'Select a plugin',
    },
  ]);
  flags.plugin = answers.plugin;

  try {
    // yarn
    await run(`yarn add ycs-plugin-${flags.plugin}`, {
      cwd: `${cwd}`,
      stdio: 'inherit',
    });

    // copy default config
    await fse.mkdirp(cwd + '/src/plugins');
    await fse.copy(
      `node_modules/ycs-plugin-${flags.plugin}/default_config`,
      `${cwd}/src/plugins/${flags.plugin}.ts`
    );

    // success
    console.log('Plugin', colors.cyan(flags.plugin), 'has been added');
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function remove(flags: any) {
  const cwd = process.cwd();
  const exists = await loadExistsPlugins();
  console.log(colors.yellow('Plugins installed:'));
  console.log('[', colors.green(exists.join(', ')), ']');
  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'plugins',
      choices: exists,
      default: [],
      message: colors.red('Removing plugins'),
    },
  ]);
  flags.plugins = answers.plugins;

  if(!flags.plugins.length) return false;

  try {
    // yarn
    const plugins =
      flags.plugins
        .map((x: string) => 'ycs-plugin-' + x)
        .join(' ');
    await run(`yarn remove ${plugins}`, {
      cwd: `${cwd}`,
      stdio: 'inherit',
    });

    // remove config
    for(const plugin of flags.plugins)
      await fse.remove(`${cwd}/src/plugins/${plugin}.ts`);

    // success
    console.log('Plugin', colors.red(flags.plugins.join(' ')), 'has been removed');
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function requestPlugins() {
  const url = 'https://api.github.com/orgs/yc-server/repos';
  const res: any[] = await rp.get(url, {
    json: true,
    headers: {
      'User-Agent': 'YCS Cli ' + new Date().toISOString(),
    },
  });
  return res
    .filter(x => x.name.startsWith('ycs-plugin-'))
    .map(x => x.name.slice(11));
}

export async function loadExistsPlugins() {
  const cwd = process.cwd();
  const pluginPath = cwd + '/src/plugins';
  if (!fs.existsSync(pluginPath)) return [];
  const files = await fse.readdir(pluginPath);
  return files
    .filter(x => x.endsWith('.ts'))
    .map(x => x.slice(0, x.length - 3));
}
