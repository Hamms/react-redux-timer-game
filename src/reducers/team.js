export const HIRE_WARRIOR = 'team/HIRE_WARRIOR';
export const HIRE_MAGE = 'team/HIRE_MAGE';

const initialState = {
  warriors: 0,
  mages: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case HIRE_WARRIOR:
      return {
        ...state,
        warriors: state.warriors + 1
      }

    case HIRE_MAGE:
      return {
        ...state,
        mages: state.mages + 1
      }

    default:
      return state;
  }
}
