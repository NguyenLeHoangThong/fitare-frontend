import produce from "immer";
import * as types from "./actionTypes";

const initial = {
    trainer: null
};

export const trainerReducer = (state = initial, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case types.SET_TRAINER_REDUCER:
                draft.trainer = action?.data;
                break;
            case types.SET_TRAINER_LOGOUT_REDUCER:
                draft.trainer = null;
                break;
            default:
                return state;
        }
    });
