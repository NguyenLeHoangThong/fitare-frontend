import produce from "immer";
import * as types from "./actionTypes";

const initial = {
    trainee: null
};

export const traineeReducer = (state = initial, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case types.SET_TRAINEE_REDUCER:
                draft.trainee = action?.data;
                break;
            case types.SET_TRAINEE_LOGOUT_REDUCER:
                draft.trainee = null;
                break;
            default:
                return state;
        }
    });
