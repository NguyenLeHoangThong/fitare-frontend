import { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { routes } from './routes';
import LoadingScreen from "components/LoadingScreen";
import Default from "pages/Default";
import Login from "pages/Login";
import Register from "pages/Register";
import SetSummary from "pages/SetSummary";
import Plans from "pages/Plans";
import MyPlans from "pages/MyPlans";
import SetExercisePlan from "pages/SetExercisePlan";
import EditExercisePlan from "pages/EditExercisePlan";
import EditExercise from "pages/EditExercise";
import TraineeAuthRoute from "./TraineeAuthRoute";
import TrainerAuthRoute from "./TrainerAuthRoute";
import RedirectAuthRoute from "./RedirectAuthRoute";

const Routers = () =>   {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Switch>
                {/* <Route path={routes.default} exact render={(props) => <Default {...props} />} /> */}
                <RedirectAuthRoute path={routes.login} exact render={(props) => <Login {...props} />} />
                <RedirectAuthRoute path={routes.register} exact render={(props) => <Register {...props} />} />
                
                <TraineeAuthRoute path={routes.plans} exact render={(props) => <Plans {...props} />} />
                <TraineeAuthRoute path={routes.myPlans} exact render={(props) => <MyPlans {...props} />} />

                {/* <Route path={routes.setExercisePlan} exact render={(props) => <SetExercisePlan {...props} />} /> */}

                <TraineeAuthRoute path={routes.plans} exact render={(props) => <Plans {...props} />} />
                <TrainerAuthRoute path={routes.myPlans} exact render={(props) => <MyPlans {...props} />} />
                <TrainerAuthRoute path={routes.setExercisePlan} exact render={(props) => <SetExercisePlan {...props} />} />
                
                <TraineeAuthRoute path={routes.setSummary} exact render={(props) => <SetSummary {...props} />} />
                
                <Route><Redirect to={routes.login} /></Route>
            </Switch>
        </Suspense>
    )
}


export default Routers;