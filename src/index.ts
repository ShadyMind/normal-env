import type { Config, Checkers, StaticCheckerFn } from './types';
import { DEFAULT_CONFIG } from './constants';

const isObject = (input: unknown): input is Record<PropertyKey, unknown> =>
  input !== null && input instanceof Object && !(Symbol.iterator in input);

  // @TODO think about getters instead of type guards for env accessors
const isWeb = (global: unknown): global is WebAPI =>
  isObject(global) && isObject(global['document'])
    && global['document']['nodeType'] === 9
    && typeof global['document']['nodeName'] === 'string';

const isNode = (global: unknown): global is NodeAPI =>
  isObject(global)
    && isObject(global['process'])
    && isObject(global['process']['versions'])
    && typeof global['process']['versions']['node'] === 'string'
    && isObject(global['process']['env'])
    && typeof global['process']['env']['NODE_ENV'] === 'string';

const isDeno = (global: unknown): global is { Deno: DenoAPI } =>
  isObject(global)
    && isObject(global['Deno'])
    && isObject(global['Deno']['version'])
    && typeof global['Deno']['version']['deno'] === 'string'
    && isObject(global['Deno']['env'])
    && typeof global['Deno']['env']['get'] === 'function';

const isBun = (global: unknown): global is { Bun: BunAPI } => 
  isObject(global)
  && isObject(global['Bun'])
  && isObject(global['Bun']['env'])
  && typeof global['Bun']['env']['BUN_ENV'] === 'string';

let intrinsicEnv: string | null = null;

const getIntrinsicEnv = (): string | null => {
  const global = globalThis || window;

  if (isNode(global)) {
    intrinsicEnv = global.process.env['NODE_ENV'] || null;
  }

  if (isWeb(global)) {
    intrinsicEnv = global.localStorage.getItem('WEB_ENV');
  }

  if (isDeno(global)) {
    intrinsicEnv = global.Deno.env.get('DENO_ENV') || null;
  }

  if (isBun(global)) {
    intrinsicEnv = global.Bun.env['BUN_ENV'] || null;
  }

  return intrinsicEnv;
}

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
  }

  return Env as {
    new(token?: string): (InstanceType<typeof Env> & Checkers<T>);
    from(token: string): (InstanceType<typeof Env> & Checkers<T>);
  };
}

export const Env = createEnvConstructor(DEFAULT_CONFIG);