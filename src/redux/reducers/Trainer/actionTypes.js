export const SET_TRAINER_REDUCER = "SET_TRAINER_REDUCER";

export const SET_TRAINER_LOGOUT_REDUCER = "SET_TRAINER_LOGOUT_REDUCER";

export const SET_TRAINER_CREATED_PLANS_REDUCER = "SET_TRAINER_CREATED_PLANS_REDUCER";

export const SET_TRAINER_FAVORITE_PLANS_REDUCER = "SET_TRAINER_FAVORITE_PLANS_REDUCER";


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

export const setTrainerCreatedPlans = (data) => {
    return {
        type: SET_TRAINER_CREATED_PLANS_REDUCER,
        data: data,
    };
}

export const setTrainerFavoritePlans = (data) => {
    return {
        type: SET_TRAINER_FAVORITE_PLANS_REDUCER,
        data: data,
    };
}