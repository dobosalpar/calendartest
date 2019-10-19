import { GET_USER } from '../Actions/types';

const initialState = {
  userName: null,
}

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_USER:
      return {
        payload,
      }
  
    default:
      return state;
  }
}
