const fs = require("fs");
const WebpackCLI = require("webpack-cli");
const path = require("path");
const Module = require("module");
const { FRAMES, ASSETS_FOLDER, PROJECTS_FOLDER } = require("./core/constants");

const originalModuleCompile = Module.prototype._compile;

const GLOBAL_ASSETS = path.resolve(__dirname, "core/global");

const params = process.argv.slice(2);

const settings = params.reduce((acc, param) => {
  const [name, value] = param.split("=");
  acc[name] = value ?? true;

  return acc;
}, {});

if (!("name" in settings)) {
  throw new Error("Set up project name");
}

function createProjectFolderStructure(projectPath) {
  fs.mkdirSync(projectPath);
  fs.mkdirSync(path.resolve(projectPath, ASSETS_FOLDER));

  const templatesPath = path.resolve(__dirname, "core/templates");
  const templates = fs.readdirSync(templatesPath);

  const globalAssets = fs.readdirSync(GLOBAL_ASSETS);
  fs.mkdirSync(path.resolve(projectPath, "global"));
  globalAssets.forEach((asset) => {
    fs.copyFileSync(
      path.resolve(GLOBAL_ASSETS, asset),
      `${projectPath}/global/${asset}`
    );
  });

  FRAMES.forEach((frame) => {
    const framePath = path.resolve(projectPath, frame);
    fs.mkdirSync(framePath);

    templates.forEach((file) => {
      const match = file.match(/(\.[a-z]+$)/);
      if (!match) return;

      fs.copyFileSync(
        path.resolve(templatesPath, file),
        `${framePath}/${frame}${match[0]}`
      );
    });
  });
}

const projectPath = path.resolve(__dirname, PROJECTS_FOLDER, settings.name);

if (!fs.existsSync(projectPath)) {
  createProjectFolderStructure(projectPath);
}

const runCLI = async () => {
  try {
    // Create a new instance of the CLI object
    const cli = new WebpackCLI();

    cli._originalModuleCompile = originalModuleCompile;

    await cli.run([
      ...process.argv.slice(0, 2),
      "serve",
      "--open",
      "--env",
      `name=${settings.name}`,
    ]);
  } catch (error) {
    WebpackCLI.utils.logger.error(error);
    process.exit(2);
  }
};

runCLI();
