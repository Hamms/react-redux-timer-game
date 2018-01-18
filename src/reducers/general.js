export const SET_DEBUG = 'general/SET_DEBUG';
export const SPEND_GOLD = 'general/SPEND_GOLD';
export const EARN_GOLD = 'general/EARN_GOLD';

const initialState = {
  debug: false,
  gold: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DEBUG:
      return {
        ...state,
        debug: action.debug
      }

    case SPEND_GOLD:
      return {
        ...state,
        gold: state.gold - action.gold
      }

    case EARN_GOLD:
      return {
        ...state,
        gold: state.gold + action.gold
      }

    default:
      return state;
  }
}
