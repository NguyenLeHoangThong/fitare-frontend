import produce from "immer";
import * as types from "./actionTypes";

const initial = {
    user: null
};

export const userReducer = (state = initial, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case types.SET_USER_REDUCER:
                draft.user = action?.data;
                break;
            case types.SET_USER_LOGOUT_REDUCER:
                draft.user = null;
                break;
            default:
                return state;
        }
    });
