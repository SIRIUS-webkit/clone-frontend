import { UPDATE_LOADING } from "../types";

const updateLoading = (loading) => (dispatch) => {
  dispatch({
    type: UPDATE_LOADING,
    loading,
  });
};

export default updateLoading;
