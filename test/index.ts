import type { Checkers } from '../src/types';
import { Env, createEnvConstructor } from '../src/index';
import { DEFAULT_CONFIG } from '../src/constants';

const CustomEnv = createEnvConstructor({
  record: {
    default: false,
    aliases: ['r', 'rd', 'rec']
  },
  play: { 
    default: true,
    aliases: ['p', 'pl', 'ply']
  },
  stop: {
    default: false,
    aliases: ['s', 'stp']
  },
  pause: {
    default: false,
    aliases: ['pa', 'pau']
  },
  rewind: {
    default: false,
    aliases: ['rw', 'rwd']
  }
});

const capitalize = (input: string): string =>
  input.slice(0, 1).toUpperCase().concat(input.slice(1));

describe('Env main functionality', () => {
  it('should use development if nothing provided', () => {
    jest.requireMock;
    expect(process.env).not.toHaveProperty('NODE_ENV');
    expect(new Env().toString()).toBe('development');
  });

  it('should handle all shorthands', () => {
    Object.entries(DEFAULT_CONFIG).forEach(([formalName, { aliases }]) => {
      aliases.forEach((alias) => {
        expect(new Env(alias).name()).toBe(formalName);
      });
    });
  });

  it('should handle custom map', () => {
    expect(new CustomEnv('r').toString()).toBe('record');
    expect(new CustomEnv(undefined).toString()).toBe('play');
    expect(new CustomEnv('ply').toString()).toBe('play');
  });

  it('should handle "from" static method calls', () => {
    expect(Env.from('dev').toString()).toStrictEqual('development');
  });

  it('should give true by "is" method with alias name', () => {
    expect(new Env('dev').is('dev')).toBeTruthy();
  });

  it('should give true by "is" method with formal name', () => {
    expect(new Env('dev').is('development')).toBeTruthy();
  });

  it('should give false by "is" method with unregistered name', () => {
    expect(new Env('dev').is('debug')).toBeFalsy();
  });

  it('should give result for dynamic check methods', () => {
    Object.keys(DEFAULT_CONFIG).forEach((formalName, i, all) => {
      const checkerName = `is${
        capitalize(formalName)
      }` as keyof Checkers<keyof typeof DEFAULT_CONFIG>;
      const otherCheckerName = `is${
        capitalize(all[i === 0 ? all.length - 1 : i - 1] as string)
      }` as keyof Checkers<keyof typeof DEFAULT_CONFIG>;

      expect(new Env(formalName)[checkerName]()).toBeTruthy();
      expect(new Env(formalName)[otherCheckerName]()).toBeFalsy();
    });
  });
});
