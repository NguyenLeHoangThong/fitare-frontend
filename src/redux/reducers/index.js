import { combineReducers } from "redux";
import { statusReducer } from "./Status"
import { connectRouter } from "connected-react-router";

const createRootReducer = (history) => {
    const reducers = combineReducers({
        status: statusReducer,
        router: connectRouter(history),
    });
    return reducers;
};

export default createRootReducer;