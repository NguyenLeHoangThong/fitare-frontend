import { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { routes } from './routes';
import LoadingScreen from "components/LoadingScreen";
import Default from "pages/Default";

const Routers = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Switch>
                <Route path={routes.default} render={(props) => <Default {...props} />} exact />
                <Route><Redirect to={routes.default} /></Route>
            </Switch>
        </Suspense>
    )
}


export default Routers;