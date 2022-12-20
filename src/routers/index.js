import { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { routes } from './routes';
import LoadingScreen from "components/LoadingScreen";
import Default from "pages/Default";
import Login from "pages/Login";
const Routers = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Switch>
                <>
                    <Route path={routes.default} render={(props) => <Default {...props} />} />
                    <Route path={routes.login} render={(props) => <Login {...props} />} />
                    {/* <Redirect to={routes.default} /> */}
                </>
            </Switch>
        </Suspense>
    )
}


export default Routers;