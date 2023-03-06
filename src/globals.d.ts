declare var Deno: DenoAPI;
declare var Bun: BunAPI;
declare var window: Window & typeof globalThis;

interface DenoAPI {
  version: {
    deno: string;
  };
  env: {
    has(input: string): boolean;
    get(input: string): string;
    set(input: string, value: string): void;
  };
}

interface BunAPI {
  env: Record<string, string>;
}