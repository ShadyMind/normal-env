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
  version: {
    deno: string;
  };
  env: {
    has(input: string): boolean;
    get(input: string): string | undefined;
    set(input: string, value: string): void;
  };
}

interface BunAPI {
  env: Partial<Record<string, string>>;
}