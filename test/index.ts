import { ENV_MAP, Env } from "../src";

describe("Env main functionality", () => {
  it("should use development if nothing provided", () => {
    jest.requireMock;
    const sample = new Env();

    expect(process.env).not.toHaveProperty("NODE_ENV");
    expect(sample.toString()).toStrictEqual("development");
  });

  it("should handle all shorthands", () => {
    Object.entries(ENV_MAP).forEach((kv) => {
      expect(new Env(kv[0]).toString()).toStrictEqual(kv[1]);
    });
  });

  it("should handle custom map", () => {
    const customMap = {
      default: "play",
      r: "record",
      rec: "record",
      record: "record",
      p: "play",
      ply: "play",
      play: "play",
    };

    expect(new Env("r", customMap).toString()).toStrictEqual("record");
    expect(new Env(undefined, customMap).toString()).toStrictEqual("play");
    expect(new Env("ply", customMap).toString()).toStrictEqual("play");
  });

  it('should handle "from" static method calls', () => {
    const sample = Env.from("dev");

    expect(sample.toString()).toStrictEqual("development");
  });

  it('should handle "isCI" method call', () => {
    const sample1 = Env.from("ci");
    const sample2 = new Env();

    expect(sample1.isCi()).toStrictEqual(true);
    expect(sample2.isCi()).toStrictEqual(false);
  });

  it('should handle "isDocker" method call', () => {
    const sample1 = Env.from("docker");
    const sample2 = new Env();

    expect(sample1.isDocker()).toStrictEqual(true);
    expect(sample2.isDocker()).toStrictEqual(false);
  });

  it('should handle "isDebug" method call', () => {
    const sample1 = Env.from("debug");
    const sample2 = new Env();

    expect(sample1.isDebug()).toStrictEqual(true);
    expect(sample2.isDebug()).toStrictEqual(false);
  });

  it('should handle "isDevelopment" method call', () => {
    const sample1 = Env.from("dev");
    const sample2 = new Env("ci");

    expect(sample1.isDevelopment()).toStrictEqual(true);
    expect(sample2.isDevelopment()).toStrictEqual(false);
  });

  it('should handle "isTest" method call', () => {
    const sample1 = Env.from("test");
    const sample2 = new Env();

    expect(sample1.isTest()).toStrictEqual(true);
    expect(sample2.isTest()).toStrictEqual(false);
  });

  it('should handle "isTest" method call', () => {
    const sample1 = Env.from("test");
    const sample2 = new Env();

    expect(sample1.isTest()).toStrictEqual(true);
    expect(sample2.isTest()).toStrictEqual(false);
  });

  it('should handle "isPreview" method call', () => {
    const sample1 = Env.from("preview");
    const sample2 = new Env();

    expect(sample1.isPreview()).toStrictEqual(true);
    expect(sample2.isPreview()).toStrictEqual(false);
  });

  it('should handle "isProduction" method call', () => {
    const sample1 = Env.from("production");
    const sample2 = new Env();

    expect(sample1.isProduction()).toStrictEqual(true);
    expect(sample2.isProduction()).toStrictEqual(false);
  });
});
