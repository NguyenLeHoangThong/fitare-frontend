import produce from "immer";
import * as types from "./actionTypes";

const initial = {
    isLoading: false,
    isLoadingAuth: true,
    error: undefined
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
            default:
                return state;
        }
    });
