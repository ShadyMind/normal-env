// cSpell:words devel, preprom, preprod

type EnvKind =
  | "ci"
  | "docker"
  | "debug"
  | "development"
  | "test"
  | "preview"
  | "production";

export const CI = "ci" as const;
export const DOCKER = "docker" as const;
export const DEBUG = "debug" as const;
export const DEVELOPMENT = "development" as const;
export const TEST = "test" as const;
export const PREVIEW = "preview" as const;
export const PRODUCTION = "production" as const;

interface EnvMap<T extends string = string> {
  default: T;
  [key: string]: T;
}

export const ENV_MAP: EnvMap<EnvKind> = {
  default: DEVELOPMENT,
  ci: CI,
  dok: DOCKER,
  dkr: DOCKER,
  [DOCKER]: DOCKER,
  dbg: DEBUG,
  [DEBUG]: DEBUG,
  d: DEVELOPMENT,
  dev: DEVELOPMENT,
  devel: DEVELOPMENT,
  develop: DEVELOPMENT,
  [DEVELOPMENT]: DEVELOPMENT,
  t: TEST,
  tst: TEST,
  [TEST]: TEST,
  pre: PREVIEW,
  prev: PREVIEW,
  prep: PREVIEW,
  preprom: PREVIEW,
  preprod: PREVIEW,
  stg: PREVIEW,
  stage: PREVIEW,
  [PREVIEW]: PREVIEW,
  p: PRODUCTION,
  prod: PRODUCTION,
  product: PRODUCTION,
  [PRODUCTION]: PRODUCTION,
};

const getEnvToken = () => {
  if (globalThis) {
    const versions = globalThis.process?.versions;

    if ("node" in versions) {
      return process.env["NODE_ENV"];
    }

    if ("document" in globalThis) {
      if (globalThis.localStorage instanceof globalThis.Storage) {
        return globalThis.localStorage.getItem("ENV");
      }
    }
  }

  return "";
};

export class Env<T extends string = string> {
  private map: EnvMap<T>;
  private value: string;

  constructor(env = getEnvToken(), map?: EnvMap<T>) {
    this.map = map || (ENV_MAP as EnvMap<T>);
    this.value = env || this.map.default;
  }

  static from(env: string) {
    return new Env(env);
  }

  toString() {
    return this.map[this.value];
  }

  isCi() {
    return this.map === ENV_MAP && this.toString() === CI;
  }

  isDocker() {
    return this.map === ENV_MAP && this.toString() === DOCKER;
  }

  isDebug() {
    return this.map === ENV_MAP && this.toString() === DEBUG;
  }

  isDevelopment() {
    return this.map === ENV_MAP && this.toString() === DEVELOPMENT;
  }

  isTest() {
    return this.map === ENV_MAP && this.toString() === TEST;
  }

  isPreview() {
    return this.map === ENV_MAP && this.toString() === PREVIEW;
  }

  isProduction() {
    return this.map === ENV_MAP && this.toString() === PRODUCTION;
  }
}
