export const SET_LOADING_REDUCER = "SET_LOADING_REDUCER";
export const SET_ERROR_REDUCER = "SET_ERROR_REDUCER";
export const SET_SUCCESS_REDUCER = "SET_SUCCESS_REDUCER";


export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING_REDUCER,
    isLoading,
  };
};

export const setSuccessMess = (mess) => {
  return {
    type: SET_SUCCESS_REDUCER,
    success: mess,
  };
};

export const setErrorMess = (e) => {
  return {
    type: SET_ERROR_REDUCER,
    error: e?.detail || e?.message || e?.error || "Unknown error",
  };
};

export const clearErrorMess = (e) => {
  return {
    type: SET_ERROR_REDUCER,
    error: undefined,
  };
};