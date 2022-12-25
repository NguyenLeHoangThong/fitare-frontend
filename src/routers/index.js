import { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { routes } from './routes';
import LoadingScreen from "components/LoadingScreen";
import Default from "pages/Default";
import Login from "pages/Login";
import Register from "pages/Register";
import SetSummary from "pages/SetSummary";
import SetContent from "pages/SetContent";
import SetFinish from "pages/SetFinish";
const Routers = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Switch>
                    <Route path={routes.login} render={(props) => <Login {...props} />} exact  />
                    <Route path={routes.register} render={(props) => <Register {...props} />} exact  />
                    <Route path={routes.setSummary} render={(props) => <SetSummary {...props} />}  exact />
                    {/* <Redirect to={routes.default} /> */}
                    <Route path={routes.setContent} render={(props) => <SetContent {...props} />} exact />
                    <Route path={routes.setFinish} render={(props) => <SetFinish {...props} />} exact />
                    
                    <Route path={routes.default} render={(props) => <Default {...props} />} exact />
                    
                    <Route><Redirect to={routes.default} /></Route>
            </Switch>
        </Suspense>
    )
}


export default Routers;