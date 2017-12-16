import * as colors from 'colors/safe';
import * as eac from 'english-article-classifier';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as lodash from 'lodash';
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
      validate: input => {
        if (fs.existsSync(input)) {
          return colors.red(`API Path ${input} already exits`);
        }
        return true;
      },
    },
  ]);
  flags.model = answers.model;
  flags.endpoint = answers.endpoint;
  flags.path = answers.path;

  try {
    // mkdir
    await fse.mkdirp(flags.path);

    // readfile
    const controllerTmp = await fse.readFile(
      __dirname + '/../templates/api/controller.ts'
    );
    const modelTmp = await fse.readFile(
      __dirname + '/../templates/api/model.ts'
    );
    const routerTmp = await fse.readFile(
      __dirname + '/../templates/api/router.ts'
    );

    console.log(modelTmp.toString());

    // prepare options
    const modelUppercase = lodash.capitalize(flags.model);
    const options: any = {
      model: flags.model,
      modelUppercase: modelUppercase,
      modelUppercasePlural: pluralize(modelUppercase),
      article: eac.classifyArticle(flags.model).type,
      endpoint: flags.endpoint,
    };

    // render template
    const controller = lodash.template(controllerTmp.toString())(options);
    const model = lodash.template(modelTmp.toString())(options);
    const router = lodash.template(routerTmp.toString())(options);

    // output files
    await fse.outputFile(`${flags.path}/controller.ts`, controller);
    await fse.outputFile(`${flags.path}/model.ts`, model);
    await fse.outputFile(`${flags.path}/router.ts`, router);

    // success
    console.log('Api', colors.cyan(flags.model), 'has been created');
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
