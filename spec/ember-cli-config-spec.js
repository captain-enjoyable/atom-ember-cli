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

describe("EmberCliConfig#config", function() {
  it("returns a POJO of the config", function() {
    let emberCliConfig = new EmberCliConfig;

    expect(emberCliConfig.config()).toEqual({ testing: true });
  });

  it("can handle json with comments", function() {
    let emberCliConfig = new EmberCliConfig;

    emberCliConfig.pathToConfig = atom.project.getPaths()[0] + "/.ember-cli-with-comments";
    expect(emberCliConfig.config().testing).toBe(true);
  })

  it("memoizes the config", function() {
    let emberCliConfig = new EmberCliConfig
    spyOn(fs, 'readFileSync').andCallFake(function() {
      return true
    });

    emberCliConfig.config()
    emberCliConfig.config()
    expect(fs.readFileSync.calls.length).toEqual(1)
  })
});
