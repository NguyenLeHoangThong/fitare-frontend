import produce from "immer";
import * as types from "./actionTypes";

const initial = {
    trainee: null,
    favoritePlans: []
};

export const traineeReducer = (state = initial, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case types.SET_TRAINEE_REDUCER:
                draft.trainee = action?.data;
                break;
            case types.SET_TRAINEE_LOGOUT_REDUCER:
                draft.trainee = null;
                draft.favoritePlans = [];
                break;
            case types.SET_TRAINEE_FAVORITE_PLANS_REDUCER:
                draft.favoritePlans = action?.data;
                break;
            default:
                return state;
        }
    });
