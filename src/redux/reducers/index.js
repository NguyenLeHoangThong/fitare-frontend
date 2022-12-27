import { combineReducers } from "redux";
import { statusReducer } from "./Status"
import { userReducer } from "./User";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history) => {
    const reducers = combineReducers({
        status: statusReducer,
        user: userReducer,
        router: connectRouter(history),
    });
    return reducers;
};

export default createRootReducer;