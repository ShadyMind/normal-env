const husky = require("husky");

if (typeof process.env["CI"] === "undefined") {
  husky.install();
}
