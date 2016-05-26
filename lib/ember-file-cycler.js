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
    let mapping = new PodPathMapping(this.config.podModulePrefix())
      .mapping(this.activePane.getDirectoryPath());

    mapping = this.removeNonExistentFiles(mapping)
    nextFilePath = this.nextFilePath(mapping)
    console.log(nextFilePath)
    if(nextFilePath) {
      atom.workspace.open(nextFilePath);
    }
  }

  nextFilePath(mapping) {
    let existFileToCycleTo = mapping.length > 1;
    let activePathIsInCyclableFiles = mapping.indexOf(this._activePanePath()) > -1;
    let isLastFileInMapping = mapping.indexOf(this._activePanePath()) === mapping.length - 1;
    console.log(existFileToCycleTo);
    console.log(activePathIsInCyclableFiles);
    console.log(isLastFileInMapping);

    if(existFileToCycleTo && activePathIsInCyclableFiles) {
      if(isLastFileInMapping) {
        return mapping[0];
      } else {
        return mapping[mapping.indexOf(this._activePanePath()) + 1];
      }
    }
  }

  removeNonExistentFiles(mapping) {
    withoutMissingFiles = [];

    mapping.map((item) => {
      if(fs.existsSync(item)) {
        withoutMissingFiles.push(item);
      }
    });

    return withoutMissingFiles;
  }

  cycleRegular(path) {
    return path;
  }

  _activePanePath() {
    return this.activePane.getDirectoryPath() + "/" + this.activePane.getFileName();
  }
}
