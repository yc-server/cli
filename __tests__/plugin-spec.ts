import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as cmd from '../src/cmd';
import { add } from '../src/plugin';

jest.mock('../src/cmd.ts', () => {
  return {
    run: jest.fn(),
  };
});

jest.mock('inquirer');
jest.mock('fs-extra', () => {
  return {
    remove: jest.fn(),
  };
});

jest.mock('fs', () => {
  return {
    existsSync: jest.fn(),
  };
});

console.log = jest.fn();
console.error = jest.fn();

describe('New plugin', () => {
  it('should add a plugin', async () => {
    const flags = { pluginAdd: true };
    (inquirer as any).setAnswers({ new: 'test-plugin' });
    const res = await add(flags);
    expect(res).toBe(true);
  });

  it('should throw errors', async () => {
    (cmd as any).run.mockImplementationOnce(x =>
      Promise.reject(new Error('throws errors'))
    );
    const flags = { pluginAdd: true };
    const res = await add(flags);
    expect(res).toBe(false);
  });
});
