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
import SelectPlan from "pages/SelectPlan";

const Routers = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Switch>
                <Route path={routes.default} exact render={(props) => <Default {...props} />} />
                <Route path={routes.login} exact render={(props) => <Login {...props} />} />
                <Route path={routes.register} exact render={(props) => <Register {...props} />} />
                
                <Route path={routes.selectPlan} exact render={(props) => <SelectPlan {...props} />} />
                
                
                <Route path={routes.setSummary} exact render={(props) => <SetSummary {...props} />} />
                <Route path={routes.setContent} exact render={(props) => <SetContent {...props} />} />
                <Route path={routes.setFinish} exact render={(props) => <SetFinish {...props} />} />
                
                <Route><Redirect to={routes.default} /></Route>
            </Switch>
        </Suspense>
    )
}


export default Routers;