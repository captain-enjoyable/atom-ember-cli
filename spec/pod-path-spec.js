'use babel';

import PodPath from '../lib/pod-path';

describe("PodPath#mapping", function() {
  it("returns all potential paths for relevant files", function() {
    spyOn(atom.project, 'getPaths').andCallFake(function() {
      return ["project-path"];
    });

    let mapping = new PodPath("meal-manager/my-pods").mapping("active-pane-directory/my-pods/something");

    expect(mapping[0]).toEqual("project-path/app/my-pods/something/template.hbs");
    expect(mapping[1]).toEqual("project-path/app/my-pods/something/component.js");
    expect(mapping[2]).toEqual("project-path/app/my-pods/something/controller.js");
    expect(mapping[3]).toEqual("project-path/app/my-pods/something/route.js");
    expect(mapping[4]).toEqual("project-path/tests/unit/my-pods/something/controller-test.js");
    expect(mapping[5]).toEqual("project-path/tests/unit/my-pods/something/route-test.js");
    expect(mapping[6]).toEqual("project-path/tests/integration/my-pods/something/component-test.js");
  });
});
