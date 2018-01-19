import React from "react";

import { mount } from "enzyme";

import { MageForeverProgress } from "../../src/components/MageForeverProgress";

describe('MageForeverProgress', () => {
  let props;
  let mountedMageForeverProgress;
  const mageForeverProgress = () => {
    if (!mountedMageForeverProgress) {
      mountedMageForeverProgress = mount(<MageForeverProgress {...props} />);
    }

    return mountedMageForeverProgress;
  };

  beforeEach(() => {
    props = {
      mages: 0,
      earnGold: jest.fn(),
    };
    mountedMageForeverProgress = undefined;
  });

  it('generates five gold per mage every twenty seconds', () => {
    jest.useFakeTimers();
    props.mages = 1;
    mageForeverProgress();
    jest.advanceTimersByTime(2000);

    jest.advanceTimersByTime(20000);
    expect(props.earnGold).toHaveBeenCalledTimes(1);
    expect(props.earnGold).toHaveBeenLastCalledWith(5);
    jest.advanceTimersByTime(20000);
    expect(props.earnGold).toHaveBeenCalledTimes(2);
    expect(props.earnGold).toHaveBeenLastCalledWith(5);

    mageForeverProgress().setProps({
      mages: 13
    })

    jest.advanceTimersByTime(20000);
    expect(props.earnGold).toHaveBeenCalledTimes(3);
    expect(props.earnGold).toHaveBeenLastCalledWith(65);
  });

  describe('progress bar', () => {
    it('shows up once we have at least one mage', () => {
      expect(mageForeverProgress().find('ForeverProgress').length).toEqual(0);
      mageForeverProgress().setProps({
        mages: 1
      });
      expect(mageForeverProgress().find('ForeverProgress').length).toEqual(1);
    });
  });
});
