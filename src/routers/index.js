import { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { routes } from './routes';
import LoadingScreen from "components/LoadingScreen";
import Default from "pages/Default";
import Login from "pages/Login";
import Register from "pages/Register";
import SetSummary from "pages/SetSummary";
import SetContent from "pages/SetContent";
import Plans from "pages/Plans";
import MyPlans from "pages/MyPlans";
import SetExercisePlan from "pages/SetExercisePlan";
import TraineeAuthRoute from "./TraineeAuthRoute";

const Routers = () =>   {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Switch>
                <Route path={routes.default} exact render={(props) => <Default {...props} />} />
                <Route path={routes.login} exact render={(props) => <Login {...props} />} />
                <Route path={routes.register} exact render={(props) => <Register {...props} />} />
                
                <Route path={routes.plans} exact render={(props) => <Plans {...props} />} />
                <Route path={routes.myPlans} exact render={(props) => <MyPlans {...props} />} />
                <Route path={routes.setExercisePlan} exact render={(props) => <SetExercisePlan {...props} />} />
                
                <Route path={routes.setSummary} render={(props) => <SetSummary {...props} />} />
                <Route path={routes.setContent} exact render={(props) => <SetContent {...props} />} />
                
                <TraineeAuthRoute path={routes.setSummary} exact render={(props) => <SetSummary {...props} />} />
                <TraineeAuthRoute path={routes.setContent} exact render={(props) => <SetContent {...props} />} />
                <Route><Redirect to={routes.default} /></Route>
            </Switch>
        </Suspense>
    )
}


export default Routers;