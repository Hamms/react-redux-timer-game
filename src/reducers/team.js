export const HIRE_WARRIOR = 'team/HIRE_WARRIOR';

const initialState = {
  warriors: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case HIRE_WARRIOR:
      return {
        ...state,
        warriors: state.warriors + 1
      }

    default:
      return state;
  }
}
