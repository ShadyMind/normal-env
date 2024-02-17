import type { Config, Checkers, StaticCheckerFn } from './types';
import { getIntrinsicEnv, isWebpackMode } from './types';
import { DEFAULT_CONFIG } from './constants';

function createAliasAssociationsMap<T extends string>(config: Config<T>): Map<string, T> {
  const map: Map<string, T> = new Map();

  for (let key in config) {
    const { aliases, default: defaultValue } = config[key];
    map.set(key, key);

    for (let i = 0, len = aliases.length; i < len; i++) {
      map.set(aliases[i]!, key);
    }

    if (defaultValue) {
      map.set('_', key);
    }
  }

  return map;
}

function buildStaticCheckers <T extends string>(config: Config<T>): Record<string, StaticCheckerFn> {
  const checkers: Record<string, StaticCheckerFn> = {};

  for (let name of Object.keys(config)) {
    checkers[`is${name[0]!.toUpperCase()}${name.slice(1)}`] = function () {
      return this.toString() === name;
    }
  }

  return checkers;
}

export function createEnvConstructor<T extends string>(config: Config<T>) {
  const aliasesMap = createAliasAssociationsMap(config);

  class Env {
    token: string | null;

    static from(token: string | undefined) {
      return new Env(token);
    }

    constructor(token = getIntrinsicEnv()) {
      Object.assign(this, buildStaticCheckers(config));
      this.token = token;
    }

    is(token: string) {
      return this.name() === aliasesMap.get(token);
    }

    name(): T | 'default' {
      let formal: T | undefined;
    
      if (this.token !== null && aliasesMap.get(this.token)) {
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

    toWebpackMode(): 'production' | 'development' | 'none' {
      const name = this.toString();

      if (isWebpackMode(name)) {
        return name;
      }

      return 'none';
    }
  }

  return Env as {
    new(token?: string): (InstanceType<typeof Env> & Checkers<T>);
    from(token: string): (InstanceType<typeof Env> & Checkers<T>);
  };
}

export const Env = createEnvConstructor(DEFAULT_CONFIG);