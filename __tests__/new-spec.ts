import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as cmd from '../src/cmd';
import { newProject } from '../src/new';

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

describe('New project', () => {
  it('should create a project', async () => {
    const flags = { new: 'helloWorld' };
    const res = await newProject(flags);
    expect(res).toBe(true);
  });

  it('should create a project with prompt', async () => {
    const flags = { new: true };
    (inquirer as any).setAnswers({ new: 'helloWorld ' });
    const res = await newProject(flags);
    expect(res).toBe(true);
  });

  it('should create a project with prompt and overwrite', async () => {
    const flags = { new: true };
    (inquirer as any).setAnswers({ new: 'helloWorld ', overwrite: true });
    (fs as any).existsSync.mockImplementationOnce(x => true);
    const res = await newProject(flags);
    expect(res).toBe(true);
  });

  it('should create a project with prompt and overwrite with false', async () => {
    const flags = { new: true };
    (inquirer as any).setAnswers({ new: 'helloWorld ', overwrite: false });
    (fs as any).existsSync.mockImplementationOnce(x => true);
    const res = await newProject(flags);
    expect(res).toBe(false);
  });

  it('should throw errors', async () => {
    (cmd as any).run.mockImplementationOnce(x =>
      Promise.reject(new Error('throws errors'))
    );
    const flags = { new: 'helloWorld' };
    const res = await newProject(flags);
    expect(res).toBe(false);
  });
});
