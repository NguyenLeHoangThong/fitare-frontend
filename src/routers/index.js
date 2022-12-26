import { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { routes } from './routes';
import LoadingScreen from "components/LoadingScreen";
import Default from "pages/Default";
import Login from "pages/Login";
import SetSummary from "pages/SetSummary";
import SetContent from "pages/SetContent";

const Routers = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Switch>
                <Route path={routes.default} exact render={(props) => <Default {...props} />} />
                <Route path={routes.login} exact render={(props) => <Login {...props} />} />
                <Route path={routes.setSummary} exact render={(props) => <SetSummary {...props} />} />
                <Route path={routes.setContent} exact render={(props) => <SetContent {...props} />} />
                {/* <Route><Redirect to={routes.default} /></Route> */}
            </Switch>
        </Suspense>
    )
}


export default Routers;