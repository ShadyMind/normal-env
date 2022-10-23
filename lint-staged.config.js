/** @typedef {string} StaticCommand */
/**
 * @callback CommandFN
 * @argument {string[]} filenames
 * @return {StaticCommand | StaticCommand[] | Promise<StaticCommand | StaticCommand[]>}
 */
/** @typedef {StaticCommand | CommandFN} Command */
/** @typedef {Command | Command[]} Commands */
/** @typedef {string} FilePattern */
/** @type {Object.<FilePattern, Commands>} */
const lintStagedConfig = {};

lintStagedConfig["src/**/*.ts"] = "tsc --noEmit";
lintStagedConfig["(src|test|scripts)/**"] = "cspell check";
lintStagedConfig["scripts/**/*.js|src/*.ts|*.md"] = "prettier --check";

module.exports = lintStagedConfig;
