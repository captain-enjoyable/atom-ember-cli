'use babel';

export default class PodPath {
  constructor(podModulePrefix) {
    let splitPodModulePrefix = podModulePrefix.split("/");
    splitPodModulePrefix.shift()
    this.podModulePrefix = splitPodModulePrefix.join("/");
    this.map = {};
  }

  mapping(activePath) {
    let podNamespace = this._podNamespace(activePath);
    let projectBase = this._projectBase();
    let podModulePrefix = this.podModulePrefix;
    // throw `1${podNamespace}2${projectBase}3${podModulePrefix}`
    return [
      `${projectBase}/app/${podModulePrefix}${podNamespace}/template.hbs`,
      `${projectBase}/app/${podModulePrefix}${podNamespace}/component.js`,
      `${projectBase}/app/${podModulePrefix}${podNamespace}/controller.js`,
      `${projectBase}/app/${podModulePrefix}${podNamespace}/route.js`,
      `${projectBase}/tests/unit/${podModulePrefix}${podNamespace}/controller-test.js`,
      `${projectBase}/tests/unit/${podModulePrefix}${podNamespace}/route-test.js`,
      `${projectBase}/tests/integration/${podModulePrefix}${podNamespace}/component-test.js`
    ];
  }

  _podNamespace(activePath) {
    return activePath.split(this.podModulePrefix)[1];
  }

  _projectBase() {
    return atom.project.getPaths()[0];
  }
}
