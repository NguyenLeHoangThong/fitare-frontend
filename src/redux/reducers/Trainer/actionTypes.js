export const SET_TRAINER_REDUCER = "SET_TRAINER_REDUCER";

export const SET_TRAINER_LOGOUT_REDUCER = "SET_TRAINER_LOGOUT_REDUCER";

export const setTrainerReducer = (data) => {
    return {
        type: SET_TRAINER_REDUCER,
        data: data,
    };
};

export const setTrainerLogoutReducer = () => {
    return {
        type: SET_TRAINER_LOGOUT_REDUCER,
    };
};
