import produce from "immer";
import * as types from "./actionTypes";

const initial = {
    trainer: null,
    createdPlans: [],
    favoritePlans: []
};

export const trainerReducer = (state = initial, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case types.SET_TRAINER_REDUCER:
                draft.trainer = action?.data;
                break;
            case types.SET_TRAINER_LOGOUT_REDUCER:
                draft.trainer = null;
                draft.createdPlans = [];
                draft.favoritePlans = [];
                break;
            case types.SET_TRAINER_CREATED_PLANS_REDUCER:
                draft.createdPlans = action?.data;
                break;
            case types.SET_TRAINER_FAVORITE_PLANS_REDUCER:
                draft.favoritePlans = action?.data;
                break;
            default:
                return state;
        }
    });
