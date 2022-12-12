import loggerMiddleware from "redux/middlewares/logger";
import sagaMiddleware from "redux/middlewares/saga";
import routerMiddleware from "redux/middlewares/router";

// eslint-disable-next-line import/no-anonymous-default-export
export default (history) => {
  if (process.env.NODE_ENV !== 'production') {
    return [routerMiddleware(history), loggerMiddleware, sagaMiddleware];
  } else {
    return [sagaMiddleware];
  }
};