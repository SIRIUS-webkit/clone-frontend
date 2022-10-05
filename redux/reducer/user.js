import { UPDATE_USER } from "../types";

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return action.data;
    default:
      return state;
  }
};

export default user;
