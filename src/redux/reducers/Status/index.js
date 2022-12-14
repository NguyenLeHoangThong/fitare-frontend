import produce from "immer";
import * as types from "./actionTypes";

const initial = {
    isLoading: false,
    error: undefined,
    success: undefined,
};

export const statusReducer = (state = initial, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case types.SET_LOADING_REDUCER:
                draft.isLoading = action.isLoading;
                break;
            case types.SET_ERROR_REDUCER:
                draft.error = action.error;
                break;
            case types.SET_SUCCESS_REDUCER:
                draft.success = action.success;
                break;
            default:
                return state;
        }
    });
