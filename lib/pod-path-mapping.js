'use babel';

export default class PodPathMapping {
  constructor(podModulePrefix) {
    let splitPodModulePrefix = podModulePrefix.split("/");
    splitPodModulePrefix.shift()
    this.podModulePrefix = splitPodModulePrefix.join("/");
    this.map = {};
  }

  mapping(activePath) {
    let podNamespace = this.podNamespace(activePath);
    let projectBase = this.projectBase();
    let podModulePrefix = this.podModulePrefix;
    let cats = [
      `${projectBase}/app/${podModulePrefix}${podNamespace}/template.hbs`,
      `${projectBase}/app/${podModulePrefix}${podNamespace}/component.js`,
      `${projectBase}/app/${podModulePrefix}${podNamespace}/controller.js`,
      `${projectBase}/app/${podModulePrefix}${podNamespace}/route.js`,
      `${projectBase}/tests/unit/${podModulePrefix}${podNamespace}/controller-test.js`,
      `${projectBase}/tests/unit/${podModulePrefix}${podNamespace}/route-test.js`,
      `${projectBase}/tests/integration/${podModulePrefix}${podNamespace}/component-test.js`
    ];
    console.log(cats[0]);
    console.log(cats[1]);
    console.log(cats[2]);
    console.log(cats[3]);
    console.log(cats[4]);
    console.log(cats[5]);
    console.log(cats[6]);

    return cats;
  }

  podNamespace(activePath) {
    return activePath.split(this.podModulePrefix)[1];
  }

  projectBase() {
    return atom.project.getPaths()[0];
  }
}
