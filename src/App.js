import './App.scss';
import Routers from 'routers';
import { ConnectedRouter } from "connected-react-router";
import AppStatus from "components/AppStatus";
import firebaseApp from "services/Firebase";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { UserService } from "services/User/user";
import { setUserReducer } from "redux/reducers/User/actionTypes";
import { setLoading, setErrorMess } from "redux/reducers/Status/actionTypes";
import { UserTypes } from "models/User";

function App({ history, dispatch }) {

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    dispatch(setLoading(true));
    new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          UserService.getUserData(user)
            .then((res) => {
              dispatch(setUserReducer(res));
              if (res?.type === UserTypes.TRAINER) {

              }
              else if (res?.type === UserTypes.TRAINEE) {

              } 
              else if (res?.type === UserTypes.QUALITY_CONTROLLER) {

              } 
              else if (res?.type === UserTypes.ADMIN) {

              }
              else {
                dispatch(setErrorMess("Not found user type !"));
              }
              resolve(res);
            })
            .catch((err) => dispatch(setErrorMess(err)))
        }
        else {
          resolve("Not authentication");
        }
      })
    })
      .finally(() => {
        dispatch(setLoading(false));
      })

  }, [dispatch])

  return (
    <ConnectedRouter history={history}>
      <AppStatus />

      <div className="pageSection">
        {
          <Routers />
        }
      </div>
    </ConnectedRouter>
  );
}

export default App;
