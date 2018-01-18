import reducer, * as types from '../../src/reducers/general';

describe('general reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      debug: false,
      gold: 0,
      totalGold: 0,
    });
  });

  it('should update both gold and total gold on earn', () => {
    expect(
      reducer(undefined, {
        type: types.EARN_GOLD,
        gold: 1,
      }),
    ).toEqual({
      debug: false,
      gold: 1,
      totalGold: 1,
    });
  });
});
