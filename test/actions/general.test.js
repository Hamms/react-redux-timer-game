import * as actions from '../../src/actions/general';
import * as types from '../../src/reducers/general';

describe('general actions', () => {
  describe('enableDebug', () => {
    it('sets debug to true', () => {
      const expected = {
        type: types.SET_DEBUG,
        debug: true
      }

      expect(actions.enableDebug()).toEqual(expected);
    });
  });
});
