import React from "react";

import { mount } from "enzyme";

import { WarriorForeverProgress } from "../../src/components/WarriorForeverProgress";

describe('WarriorForeverProgress', () => {
  let props;
  let mountedWarriorForeverProgress;
  const warriorForeverProgress = () => {
    if (!mountedWarriorForeverProgress) {
      mountedWarriorForeverProgress = mount(<WarriorForeverProgress {...props} />);
    }

    return mountedWarriorForeverProgress;
  };

  beforeEach(() => {
    props = {
      warriors: 0,
      earnGold: jest.fn(),
    };
    mountedWarriorForeverProgress = undefined;
  });

  it('generates one gold per warrior every ten seconds', () => {
    jest.useFakeTimers();
    props.warriors = 1;
    warriorForeverProgress();
    jest.advanceTimersByTime(1000);

    jest.advanceTimersByTime(10000);
    expect(props.earnGold).toHaveBeenCalledTimes(1);
    expect(props.earnGold).toHaveBeenLastCalledWith(1);
    jest.advanceTimersByTime(10000);
    expect(props.earnGold).toHaveBeenCalledTimes(2);
    expect(props.earnGold).toHaveBeenLastCalledWith(1);

    warriorForeverProgress().setProps({
      warriors: 13
    })

    jest.advanceTimersByTime(10000);
    expect(props.earnGold).toHaveBeenCalledTimes(3);
    expect(props.earnGold).toHaveBeenLastCalledWith(13);
  });

  describe('progress bar', () => {
    it('shows up once we have at least one warrior', () => {
      expect(warriorForeverProgress().find('ForeverProgress').length).toEqual(0);
      warriorForeverProgress().setProps({
        warriors: 1
      });
      expect(warriorForeverProgress().find('ForeverProgress').length).toEqual(1);
    });
  });
});
