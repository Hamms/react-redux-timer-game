export const SET_DEBUG = 'general/SET_DEBUG';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEBUG:
      return {
        ...state,
        debug: action.debug
      }

    default:
      return state;
  }
}
