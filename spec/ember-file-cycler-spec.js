'use babel';

import EmberFileCycler from '../lib/ember-file-cycler';

describe("EmberFileCycler#cycle", function() {
  it("calls cycle pods when the current file is template.hbs", function() {
    spyOn(atom.workspace, 'getActivePaneItem').andCallFake(function() {
      return {
        getFileName() {
          return "template.hbs";
        },
        getDirectoryPath() {
          return "/in/ur/folders";
        }
      }
    });

    let emberFileCycler = new EmberFileCycler;

    spyOn(emberFileCycler, "cyclePods");
    emberFileCycler.cycle();
    expect(emberFileCycler.cyclePods.calls.length).toEqual(1)
  });

  it("calls cycle pods when the current file is component.js", function() {
    spyOn(atom.workspace, 'getActivePaneItem').andCallFake(function() {
      return {
        getFileName() {
          return "component.js";
        },
        getDirectoryPath() {
          return "/in/ur/folders";
        }
      }
    });

    let emberFileCycler = new EmberFileCycler;

    spyOn(emberFileCycler, "cyclePods");
    emberFileCycler.cycle();
    expect(emberFileCycler.cyclePods.calls.length).toEqual(1)
  });

  it("calls cycle pods when the current file is controller.js", function() {
    spyOn(atom.workspace, 'getActivePaneItem').andCallFake(function() {
      return {
        getFileName() {
          return "controller.js";
        },
        getDirectoryPath() {
          return "/in/ur/folders";
        }
      }
    });

    let emberFileCycler = new EmberFileCycler;

    spyOn(emberFileCycler, "cyclePods");
    emberFileCycler.cycle();
    expect(emberFileCycler.cyclePods.calls.length).toEqual(1)
  });

  it("calls cycle pods when the current file is route.js", function() {
    spyOn(atom.workspace, 'getActivePaneItem').andCallFake(function() {
      return {
        getFileName() {
          return "route.js";
        },
        getDirectoryPath() {
          return "/in/ur/folders";
        }
      }
    });

    let emberFileCycler = new EmberFileCycler;

    spyOn(emberFileCycler, "cyclePods");
    emberFileCycler.cycle();
    expect(emberFileCycler.cyclePods.calls.length).toEqual(1)
  });

  it("with any other name is calls the regular cycle function", function() {
    spyOn(atom.workspace, 'getActivePaneItem').andCallFake(function() {
      return {
        getFileName() {
          return "anythingElse.js";
        },
        getDirectoryPath() {
          return "/in/ur/folders";
        }
      }
    });

    let emberFileCycler = new EmberFileCycler;

    spyOn(emberFileCycler, "cycleRegular");
    emberFileCycler.cycle();
    expect(emberFileCycler.cycleRegular.calls.length).toEqual(1)
  });
});
