import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Routers from 'routers';
import { ConnectedRouter } from "connected-react-router";
import AppStatus from "components/AppStatus"

function App({ history, dispatch }) {

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
