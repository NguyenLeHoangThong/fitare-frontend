import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'redux/reducers/Status/actionTypes';
import Routers from 'routers';
import { ConnectedRouter } from "connected-react-router";
import { push } from "connected-react-router";

function App({ history, dispatch }) {

  const isLoading = useSelector(
    // @ts-ignore
    (state) => state?.status?.isLoading
  );

  return (
    <ConnectedRouter history={history}>

      <div className="pageSection">

      </div>

    </ConnectedRouter>
  );
}

export default App;
