export const GET_USER_REQUEST = "GET_USER_REQUEST";

export const SET_USER_REDUCER = "SET_USER_REDUCER";

export const SET_USER_LOGOUT_REDUCER = "SET_USER_LOGOUT_REDUCER";

export const getUser = () => {
    return {
        type: GET_USER_REQUEST,
    };
};

export const setUserReducer = (data) => {
    return {
        type: SET_USER_REDUCER,
        data: data,
    };
};

export const setUserLogoutReducer = () => {
    return {
        type: SET_USER_LOGOUT_REDUCER,
    };
};
