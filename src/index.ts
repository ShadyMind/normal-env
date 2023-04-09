import type { EnvConfig, Config, Checkers, EnvStaticBase } from './types';
import './globals';
import { DEFAULT_CONFIG } from './constants';

const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null && typeof process.env !== 'undefined';
const isWeb = typeof window !== 'undefined' && typeof window.document !== 'undefined';
const isDeno = typeof Deno !== 'undefined' && typeof Deno.version !== 'undefined' && typeof Deno.version.deno !== 'undefined' && typeof Deno.env !== 'undefined';
const isBun = typeof Bun !== 'undefined' && typeof Bun.env !== 'undefined';

const getIntrinsicEnv = (): string | undefined => {
  if (isWeb) {
    return window.localStorage.getItem('WEB_ENV');
  }

  if (isNode) {
    return process.env['NODE_ENV'];
  }

  if (isDeno) {
    return Deno.env.get('DENO_ENV');
  }

  if (isBun) {
    return Bun.env['BUN_ENV'];
  }

  return undefined;
}

const createAliasAssociationsMap = <T extends string>(config: Config<T>): Map<string, T> => {
  const map: Map<string, T> = new Map();

  for (let [name, value] of Object.entries<EnvConfig>(config)) {
    map.set(name, name as T);

    value.aliases.forEach((alias) => {
      map.set(alias, name as T);
    });

    if (value.default) {
      map.set('_', name as T);
    }
  }

  return map;
}

const createCheckers = <T extends string>(config: Config<T>): Record<string, () => boolean> => {
  const checkers: Record<string, () => boolean> = {};

  for (let name of Object.keys(config)) {
    checkers[`is${name.at(0)?.toUpperCase()}${name.slice(1)}`] = function () {
      return this.toString() === name;
    }
  }

  return checkers;
}

export function createEnvConstructor<T extends string>(config: Config<T>) {
  const aliasesMap = createAliasAssociationsMap(config);

  class Env implements EnvStaticBase<T> {
    token: string | undefined;

    static from(token: string | undefined) {
      return new Env(token);
    }

    constructor(token = process.env['NODE_ENV']) {
      Object.assign(this, createCheckers(config));
      this.token = token || getIntrinsicEnv();
    }

    is(token: string) {
      return this.name() === aliasesMap.get(token);
    }

    name(): T | 'default' {
      let formal: T | undefined;
    
      if (typeof this.token !== 'undefined' && aliasesMap.get(this.token)) {
        formal = aliasesMap.get(this.token);
      } else {
        formal = aliasesMap.get('_');
      }

      if (!formal) {
        return 'default';
      }

      return formal;
    }

    toString(): T | 'default' {
      return this.name();
    }
  }

  return Env as {
    new(token?: string): (InstanceType<typeof Env> & Checkers<T>);
    from(token: string): (InstanceType<typeof Env> & Checkers<T>);
  };
}

export const Env = createEnvConstructor(DEFAULT_CONFIG);