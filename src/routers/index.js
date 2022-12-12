import { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { routes } from './routes';

const Routers = () => {
    return (
        <Suspense>
            <Switch>
                {/* Sample router codebase, please copy: <Route path={routes.login} render={(props) => <AboutUs {...props} />} /> */}
            </Switch>
        </Suspense>
    )
}


export default Routers;