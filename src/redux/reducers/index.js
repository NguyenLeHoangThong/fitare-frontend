import { combineReducers } from "redux";
import { statusReducer } from "./Status"
import { userReducer } from "./User";
import { trainerReducer } from "./Trainer";
import { traineeReducer } from "./Trainee";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history) => {
    const reducers = combineReducers({
        status: statusReducer,
        user: userReducer,
        trainer: trainerReducer,
        trainee: traineeReducer,
        router: connectRouter(history),
    });
    return reducers;
};

export default createRootReducer;