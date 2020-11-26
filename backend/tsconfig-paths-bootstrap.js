var tsConfig = require("./tsconfig.json");
var tsConfigPaths = require("tsconfig-paths");

var mode = process.env.NODE_ENV;
var baseUrl = mode === "development" ? "src" : "dist";
console.log("tsconfig-paths-bootstrap: ", baseUrl);

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
