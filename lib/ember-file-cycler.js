'use babel';

import PodPathMapping from './pod-path-mapping';

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

    this.cyclePods(this._activePanePath());
    // if (podFileTypes.indexOf(fileName) > -1) {
    // } else {
    //   this.cycleRegular(this._activePanePath())
    // }
  }

  cyclePods(path) {
    debugger;
    let mapping = new PodPathMapping(this.config.podModulePrefix()).mapping();
  }

  cycleRegular(path) {
    return path;
  }

  _activePanePath() {
    return this.activePane.getDirectoryPath() + "/" + this.activePane.getFileName();
  }
}
