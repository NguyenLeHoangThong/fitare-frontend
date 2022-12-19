import './App.scss';
import Routers from 'routers';
import { ConnectedRouter } from "connected-react-router";
import AppStatus from "components/AppStatus";
import firebaseApp from "services/Firebase";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

function App({ history, dispatch }) {

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // user logged in, please call user info here and store in redux
      }
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
