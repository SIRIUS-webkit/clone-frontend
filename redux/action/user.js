import { UPDATE_USER } from "../types";

const user = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_USER,
    data,
  });
};

export default user;
