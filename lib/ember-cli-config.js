'use babel';

let fs = require('fs');
let commentedJson = require('comment-json');
let loophole = require('loophole');

export default class AtomEmberCli {
  constructor() {
    this.pathToConfig = atom.project.getPaths()[0] + "/.ember-cli"
    this.pathToEnv = atom.project.getPaths()[0] + "/config/environment.js"
  }

  isEmberProject() {
    return fs.existsSync(this.pathToConfig)
  }

  usesPodStructure() {
    return this._config().usePods
  }

  podModulePrefix() {
    return this._env().podModulePrefix
  }

  _config() {
    if(this.cliConfig) {
      return this.cliConfig
    }

    let contents = fs.readFileSync(this.pathToConfig);
    return this.cliConfig = commentedJson.parse(contents)
  }

  _env() {
    if(this.cliEnv) {
      return this.cliEnv;
    }

    let cliEnv;
    let pathToEnv = this.pathToEnv;
    if (fs.existsSync(pathToEnv)) {
      loophole.allowUnsafeEval(() => {
        cliEnv = eval(fs.readFileSync(pathToEnv).toString())();
      });
    } else {
      cliEnv = {};
    }

    this.cliEnv = cliEnv;
    return this.cliEnv;
  }
}
