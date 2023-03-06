export type EnvConfig = {
  default: boolean;
  aliases: string[];
};

export type Config<T extends string> = Record<T, EnvConfig>;

export type Checkers<T extends string> = {
  [key in `is${Capitalize<T>}`]: () => boolean;
};

export interface EnvStaticBase<T extends string> {
  name(): T | 'default';
  toString(): T | 'default';
  is(token: string): boolean;
}