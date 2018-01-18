import React from "react";
import { mount } from "enzyme";
import { Playspace } from "../../src/components/Playspace";

describe('Playspace', () => {
  let props;
  let mountedPlayspace;
  const playspace = () => {
    if (!mountedPlayspace) {
      mountedPlayspace = mount(<Playspace {...props} />);
    }
    return mountedPlayspace;
  };

  beforeEach(() => {
    props = {
      gold: 0,
      warriors: 0,
      totalGold: 0,
      earnGold: () => {},
      spendGold: () => {},
      hireWarrior: () => {},
    };
    mountedPlayspace = undefined;
  });

  // All tests will go here
  it("always renders a header, main, and footer", () => {
    playspace();
    expect(mountedPlayspace.find("header").length).toEqual(1);
    expect(mountedPlayspace.find("main").length).toEqual(1);
    expect(mountedPlayspace.find("footer").length).toEqual(1);
  })
});
