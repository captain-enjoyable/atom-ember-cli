'use babel';

import EmberCliConfig from '../lib/ember-cli-config';

let fs = require('fs');
let commentedJson = require('comment-json');

describe("EmberCliConfig#isEmberProject", function() {
  it("returns true when there is a ember-cli config", function() {
    let emberCliConfig = new EmberCliConfig
    expect(emberCliConfig.isEmberProject()).toBe(true)
  })

  it("returns false when there is no ember-cli config", function() {
    let fixtureConfig = atom.project.getPaths()[0] + "/does-not-exist"

    spyOn(atom.project, 'getPaths').andCallFake(function() {
      return [fixtureConfig]
    })

    let emberCliConfig = new EmberCliConfig
    expect(emberCliConfig.isEmberProject()).toBe(false)
  })
});

describe("EmberCliConfig#usesPodStructure", function() {
  it("returns the pod structure config", function() {
    let emberCliConfig = new EmberCliConfig;

    expect(emberCliConfig.usesPodStructure()).toEqual("Cats");
  });

  it("can handle json with comments", function() {
    let emberCliConfig = new EmberCliConfig;

    emberCliConfig.pathToConfig = atom.project.getPaths()[0] + "/.ember-cli-with-comments";
    expect(emberCliConfig.usesPodStructure()).toEqual("Dogs");
  })
});

describe("EmberCliConfig#podModulePrefix", function() {
  it("returns the pod structure config", function() {
    let emberCliConfig = new EmberCliConfig;
    expect(emberCliConfig.podModulePrefix()).toEqual("ur-app/donkeys");
  });
});
