'use babel';

fs = require('fs')

const podFileTypes = [
  "component.js",
  "template.hbs",
  "controller.js",
  "route.js"
]

export default class EmberFileCycler {
  constructor(config) {
    this.config = config
    this.activePane = atom.workspace.getActivePaneItem();
  }

  cycle() {
    let fileName = this.activePane.getFileName();

    if (podFileTypes.indexOf(fileName) > -1) {
      this.cyclePods(this._activePanePath());
    } else {
      this.cycleRegular(this._activePanePath())
    }
  }

  cyclePods(path) {
    return path;
  }

  cycleRegular(path) {
    return path;
  }

  _activePanePath() {
    return this.activePane.getDirectoryPath() + "/" + this.activePane.getFileName();
  }
}
