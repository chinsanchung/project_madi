var tsConfigFile = require("./tsconfig.paths.json");
var tsConfigPaths = require("tsconfig-paths");

var mode = process.env.NODE_ENV;
// var srcPath = mode === 'production' ? 'dist/*' : 'src/*';
// console.log(`This is ${mode} mode`);

var paths = {
  ...tsConfigFile.compilerOptions.paths,
  "@src/*": ["dist/*"],
};

tsConfigPaths.register({
  baseUrl: ".",
  paths,
});
