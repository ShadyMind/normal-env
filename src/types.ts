export type EnvConfig = {
  default: boolean;
  aliases: string[];
};
export type StaticCheckerFn = () => boolean;
export type Config<T extends string> = Record<T, EnvConfig>;
export type Checkers<T extends string> = Record<`is${Capitalize<T>}`, StaticCheckerFn>;
type WebStorageKey = string | number | bigint;
type WebDocumentElement = {
  nodeName: '#document';
  nodeType: 9;
};

interface WebStorageAPI extends Object {
  length: number;
  clear(): void;
  getItem(key: WebStorageKey): string | null;
  key(index: number): string | null;
  removeItem(key: WebStorageKey): void;
  setItem(key: WebStorageKey, value: any): void;
}

interface WebAPI {
  localStorage: WebStorageAPI;
  sessionStorage: WebStorageAPI;
  window: WebAPI;
  document: WebDocumentElement;
}

interface NodeAPI {
  process: {
    env: Partial<Record<string, string>>;
    versions: Record<'node', string>;
  }
}

interface DenoAPI {
  Deno: {
    version: {
      deno: string;
    };
    env: {
      has(input: string): boolean;
      get(input: string): string | undefined;
      set(input: string, value: string): void;
    };
  };
}

interface BunAPI {
  Bun: {
    env: Partial<Record<string, string>>;
  };
}

export interface EnvStaticBase<T extends string> {
  name(): T | 'default';
  toString(): T | 'default';
  is(token: string): boolean;
}

const isObject = (input: unknown): input is Record<PropertyKey, unknown> =>
  input !== null && input instanceof Object && !(Symbol.iterator in input);

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

const isDeno = (global: unknown): global is DenoAPI =>
  isObject(global)
    && isObject(global['Deno'])
    && isObject(global['Deno']['version'])
    && typeof global['Deno']['version']['deno'] === 'string'
    && isObject(global['Deno']['env'])
    && typeof global['Deno']['env']['get'] === 'function';

const isBun = (global: unknown): global is BunAPI => 
  isObject(global)
  && isObject(global['Bun'])
  && isObject(global['Bun']['env'])
  && typeof global['Bun']['env']['BUN_ENV'] === 'string';

export const getIntrinsicEnv = (): string | null => {
  const global: unknown = globalThis || window;

  if (isNode(global)) {
    return global.process.env['NODE_ENV'] || null;
  }

  if (isWeb(global)) {
    return global.localStorage.getItem('WEB_ENV');
  }

  if (isDeno(global)) {
    return global.Deno.env.get('DENO_ENV') || null;
  }

  if (isBun(global)) {
    return global.Bun.env['BUN_ENV'] || null;
  }

  return null;
}