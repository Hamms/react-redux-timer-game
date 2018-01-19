import React from "react";

import { shallow } from "enzyme";

import { Playspace } from "../../src/components/Playspace";

describe('Playspace', () => {
  let props;
  let mountedPlayspace;
  const playspace = () => {
    if (!mountedPlayspace) {
      mountedPlayspace = shallow(<Playspace {...props} />);
    }

    // overwrite startTask to instantly complete
    mountedPlayspace.instance().startTask = (name, onComplete) => onComplete();
    return mountedPlayspace;
  };

  beforeEach(() => {
    props = {
      gold: 0,
      totalGold: 0,
      earnGold: jest.fn(),
      spendGold: jest.fn(),
      hireWarrior: jest.fn(),
    };
    mountedPlayspace = undefined;
  });

  it("always renders a header, main, and footer", () => {
    playspace();
    expect(mountedPlayspace.find("header").length).toEqual(1);
    expect(mountedPlayspace.find("main").length).toEqual(1);
    expect(mountedPlayspace.find("footer").length).toEqual(1);
  })

  it("always defaults currentTask", () => {
    expect(playspace().state().currentTask).toEqual("idling around");
    playspace().setState({
      currentTask: null
    });
    expect(playspace().state().currentTask).toEqual("idling around");
  });

  describe('Adventure button', () => {
    it('adds 1 gold when clicked', () => {
      playspace().find('button').simulate('click');
      expect(props.earnGold).toHaveBeenCalledTimes(1);
    });
  });

  describe('Hire Warrior button', () => {
    it('only shows up after 5 total gold', () => {
      expect(playspace().find('button').length).toEqual(1);
      playspace().setProps({
        totalGold: 5
      });
      expect(playspace().find('button').length).toEqual(2);
    });

    it('only works if we have at least 5 gold on hand', () => {
      props.totalGold = 5;
      props.gold = 0;
      playspace().find('button').last().simulate('click');
      expect(props.spendGold).toHaveBeenCalledTimes(0);
      expect(props.hireWarrior).toHaveBeenCalledTimes(0);
    });

    it('spends gold if we have it', () => {
      props.totalGold = 5;
      props.gold = 5;
      playspace().find('button').last().simulate('click');
      expect(props.spendGold).toHaveBeenCalledTimes(1);
      expect(props.spendGold).toHaveBeenCalledWith(5);
      expect(props.hireWarrior).toHaveBeenCalledTimes(1);
    });
  });
});
