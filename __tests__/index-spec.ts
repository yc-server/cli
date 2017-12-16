import * as args from 'args';
import * as index from '../src/index';

jest.mock('../src/new.ts', () => {
  return {
    newProject: flags => flags,
  };
});

describe('Index', () => {
  it('should have startProgram available', () => {
    expect(index.startProgram).toBeTruthy();
  });
  it('should test new project', () => {
    expect(index.startProgram(['node', 'ycs', '-n'])).toMatchObject({
      new: true,
      n: true,
    });
    expect(
      index.startProgram(['node', 'ycs', '-n', 'helloWorld'])
    ).toMatchObject({
      new: 'helloWorld',
      n: 'helloWorld',
    });
  });
  it('should return flags', () => {
    expect(index.startProgram(['node', 'ycs'])).toMatchObject({});
  });
});
