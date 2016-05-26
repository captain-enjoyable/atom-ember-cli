'use babel';

import PodPath from './pod-path';

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

    this._cyclePods(this._activePanePath() || "pods");
    // if (podFileTypes.indexOf(fileName) > -1) {
    // } else {
    //   this.cycleRegular(this._activePanePath())
    // }
  }

  _cyclePods(path) {
    let mapping = new PodPath(this.config.podModulePrefix() || "pods")
      .mapping(this.activePane.getDirectoryPath());

    mapping = this._removeNonExistentFiles(mapping)
    nextFilePath = this._nextFilePath(mapping)

    if(nextFilePath) {
      atom.workspace.open(nextFilePath);
    }
  }

  _cycleRegular(path) {
    return path;
  }

  _nextFilePath(mapping) {
    let existFileToCycleTo = mapping.length > 1;
    let activePathIsInCyclableFiles = mapping.indexOf(this._activePanePath()) > -1;
    let isLastFileInMapping = mapping.indexOf(this._activePanePath()) === mapping.length - 1;

    if(existFileToCycleTo && activePathIsInCyclableFiles) {
      if(isLastFileInMapping) {
        return mapping[0];
      } else {
        return mapping[mapping.indexOf(this._activePanePath()) + 1];
      }
    }
  }

  _removeNonExistentFiles(mapping) {
    withoutMissingFiles = [];

    mapping.map((item) => {
      if(fs.existsSync(item)) {
        withoutMissingFiles.push(item);
      }
    });

    return withoutMissingFiles;
  }

  _activePanePath() {
    return this.activePane.getDirectoryPath() + "/" + this.activePane.getFileName();
  }
}
