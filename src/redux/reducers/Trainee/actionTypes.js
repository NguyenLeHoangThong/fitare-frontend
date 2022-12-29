export const SET_TRAINEE_REDUCER = "SET_TRAINEE_REDUCER";

export const SET_TRAINEE_LOGOUT_REDUCER = "SET_TRAINEE_LOGOUT_REDUCER";

export const setTraineeReducer = (data) => {
    return {
        type: SET_TRAINEE_REDUCER,
        data: data,
    };
};

export const setTraineeLogoutReducer = () => {
    return {
        type: SET_TRAINEE_LOGOUT_REDUCER,
    };
};
