import { SET_DEBUG, SPEND_GOLD, EARN_GOLD } from '../reducers/general';

export const enableDebug = () => ({
  type: SET_DEBUG,
  debug: true
});

export const spendGold = (gold) => ({
  type: SPEND_GOLD,
  gold
});

export const earnGold = (gold) => ({
  type: EARN_GOLD,
  gold
});
