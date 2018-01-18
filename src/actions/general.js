import { SET_DEBUG } from '../reducers/general';

export const enableDebug = () => ({
  type: SET_DEBUG,
  debug: true
});
