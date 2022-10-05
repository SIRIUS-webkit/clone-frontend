import { UPDATE_LOADING } from "../types";

const initialState = false;

const loading = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOADING:
      return action.loading;
    default:
      return state;
  }
};

export default loading;
