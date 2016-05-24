'use babel';

let fs = require('fs');
let commentedJson = require('comment-json');

export default class AtomEmberCli {
  constructor() {
    this.pathToConfig = atom.project.getPaths()[0] + "/.ember-cli"
  }

  isEmberProject() {
    return fs.existsSync(this.pathToConfig)
  }

  config() {
    if(this.cliConfig) {
      return this.cliConfig
    }

    let contents = fs.readFileSync(this.pathToConfig);
    return this.cliConfig = commentedJson.parse(contents)
  }

  usesPodStructure() {
    return this.config().usePods
  }
}
